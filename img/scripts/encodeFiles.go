package main

import (
	"bufio"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

type imgData struct {
	Index       int32  `json:"index"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Encoded     string `json:"encoded"`
}

func main() {
	dir, _ := os.Getwd()

	workPath := os.Args[1]
	fullPath := filepath.Join(dir, workPath)
	fi, err := os.Stat(fullPath)
	if err != nil {
		fmt.Println(err)
	}

	fileList := make([]string, 0)
	switch mode := fi.Mode(); {
	case mode.IsDir():
		{
			fmt.Println("directory provided")
			e := filepath.Walk(fullPath, func(path string, f os.FileInfo, err error) error {
				if f.IsDir() {
					return err
				}
				fileList = append(fileList, path)
				return err
			})

			if e != nil {
				panic(e)
			}
		}
	case mode.IsRegular():
		{
			fmt.Println("file provided")
			fileList = append(fileList, fullPath)
		}
	}

	encodedList := make([]imgData, 0)
	for _, f := range fileList {
		openFile, _ := os.Open(f)

		reader := bufio.NewReader(openFile)
		content, _ := ioutil.ReadAll(reader)

		encoded := base64.StdEncoding.EncodeToString(content)

		fmt.Println(f + " encoded")
		data := imgData{0, f, "", encoded}
		encodedList = append(encodedList, data)
		openFile.Close()
	}

	j, e := json.Marshal(encodedList)
	if e != nil {
		panic(e)
	}

	byteData := []byte(j)
	ioutil.WriteFile("img.json", byteData, 0644)
}
