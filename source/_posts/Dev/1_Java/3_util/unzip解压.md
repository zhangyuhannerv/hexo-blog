---
title: unzip解压

categories:
  - Dev
  - Java
  - util
tags:
  - Dev
  - Java
  - util
  - unzip解压
abbrlink: 9281
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=83786ea405d24f82a6f0e2e508c57631
---

## 无论压缩文件下有多少层级，所有解压后的文件都统一放在 outFileDir 文件夹下，且只保留压缩的文件，压缩的文件夹不保留

```java
import java.io.*;
import java.nio.charset.Charset;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

public class A {
    public static void main(String[] args) {
        System.out.println(unzip("C:\\Users\\13551\\Desktop\\a\\a.zip", "C:\\Users\\13551\\Desktop\\a"));
    }

    public static boolean unzip(String inFilePath, String outDirPath) {

        // 先对目标文件夹做一些判定
        File destFile = new File(outDirPath);

        if (destFile.isFile()) {// 目标是文件错过
            return false;
        }
        if (!destFile.exists()) {// 目标文件夹不存在，先创建
            destFile.mkdirs();
        }

        // 再对源文件做一些判定
        File sourceFile = new File(inFilePath);

        if (sourceFile.isDirectory() || !sourceFile.exists()) {
            return false;
        }

        String fileName = sourceFile.getName();
        String fileType = fileName.substring(fileName.lastIndexOf("."));

        if (!".zip".equals(fileType)) {// 源文件不是zip格式的
            return false;
        }

        // 一次读取1k
        byte[] buff = new byte[1024];
        int readLen = 0;

        try (ZipInputStream zin = new ZipInputStream(new FileInputStream(inFilePath), Charset.forName("GBK"));
                ZipFile zipFile = new ZipFile(sourceFile, Charset.forName("GBK"))) {

            ZipEntry entry = null;
            while (((entry = zin.getNextEntry()) != null)) {// 如果entry不为空，并不在同一个目录下

                if (entry.isDirectory()) {// 如果是文件夹不考虑，直接跳过
                    continue;
                }

                String entryName = entry.getName().substring(entry.getName().lastIndexOf("/") + 1);

                File tmp = new File(outDirPath + "/" + entryName);// 解压出的文件路径
                if (!tmp.exists()) {// 如果文件不存在
                    File parentDir = tmp.getParentFile();

                    if (!parentDir.exists()) {
                        parentDir.mkdirs();
                    }

                    try (OutputStream os = new FileOutputStream(tmp); // 将文件目录中的文件放入输出流
                            // 用输入流读取压缩文件中制定目录中的文件
                            InputStream in = zipFile.getInputStream(entry)) {

                        while ((readLen = in.read(buff)) != -1) {// 如有输入流可以读取到数值
                            os.write(buff, 0, readLen);// 输出流写入
                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                        return false;
                    }

                }
                zin.closeEntry();
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
```