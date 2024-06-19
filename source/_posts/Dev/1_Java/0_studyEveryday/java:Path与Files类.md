---
title: java:Path与Files类
categories:
  - Dev
  - Java
  - studyEveryday
tags:
  - Dev
  - Java
  - studyEveryday
  - 'java:Path与Files类'
cover: 'https://imgapi.xl0408.top?uuid=44557'
date: '2024-06-19 14:19:24'
abbrlink: 44557
---

jDK1.7引入了新的IO操作类,java.nio.file包下的Path接口和Files类。然而网上的好多教程仍然用着比较老旧的File类。这里整理一下新的用法。

## 创建文件和目录

创建文件和目录非常简单。我们可以使用Files类的createFile()方法和createDirectory()方法来创建文件和目录

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class CreateFileAndDirectory {
    public static void main(String[] args) throws IOException {
    	  //文件
        Path pathToFile = Paths.get("example.txt");
        //目录
        Path pathToDir = Paths.get("exampleDir");
		    //多级目录
		    Path pathDirectories = Paths.get("java\exampleDir\pathDirectories\dir");

        // 创建文件
        try {
            Files.createFile(pathToFile);
         } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 创建目录
        try {
        	  Files.createDirectory(pathToDir);
		} catch (IOException e) {
            throw new RuntimeException(e);
        }

		    //创建多级目录
         try {
              Files.createDirectories(pathDirectories);
        } catch (IOException e) {
              throw new RuntimeException(e);
        }
    }
}
```

上面的代码会创建一个名为“example.txt”的文件和一个名为“exampleDir”的目录。如果文件或目录已经存在，这些方法将抛出异常。
createDirectories方法会创建多级目录，上级目录不存在的话，直接创建。

## 写入文件

Java包含多种方式来写入文件。我们可以使用Files类的write()方法来将数据写入文件。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Arrays;

public class WriteToFile {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("example.txt");

        // 写入字节数组
        byte[] bytes = "Hello, world!".getBytes();
        try {
			      Files.write(path, bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        

        // 写入字符串
        String text = "Hello, world!";
        try {
			      Files.write(path, text.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        

        // 写入字符串列表
        Iterable<String> lines = Arrays.asList("line 1", "line 2", "line 3");
        try {
			    Files.write(path, lines);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } 
    }
}

```

上面的代码将数据写入“example.txt”文件。我们可以使用write()方法将字节数组、字符串或字符串列表写入文件。

## 读取文件

Java包含多种方式来读取文件。我们可以使用Files类的readAllBytes()方法、readAllLines()方法或newBufferedReader()方法来读取文件。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

public class ReadFromFile {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("example.txt");

        // 读取字节数组
        byte[] bytes = Files.readAllBytes(path);
        System.out.println(new String(bytes));

        // 读取字符串列表
        List<String> lines = Files.readAllLines(path);

        // 使用BufferedReader读取文件
        BufferedReader reader = Files.newBufferedReader(path);
        String line = null;
        while ((line = reader.readLine()) != null){
          // do something
        }
        reader.close();
```

## 删除文件或目录

删除文件或目录可以使用Files类的delete()方法。

```java
// 删除一个文件
Path fileToDeletePath = Paths.get("fileToDelete.txt");
try {
    Files.delete(fileToDeletePath);
    System.out.println("文件删除成功");
} catch (IOException e) {
    System.out.println("文件删除失败");
}

// 删除一个目录
Path dirToDeletePath = Paths.get("dirToDelete");
try {
    Files.delete(dirToDeletePath);
    System.out.println("目录删除成功");
} catch (IOException e) {
    System.out.println("目录删除失败");
}


//如果文件存在才删除，不会抛出异常
 try {
 		   //返回布尔值
       Files.deleteIfExists("dirToDelete/dir");
   } catch (IOException e) {
       throw new RuntimeException(e);
   }

```

## 复制文件

```java
// 复制一个文件
//资源地址
Path sourceFilePath = Paths.get("sourceFile.txt");
//目标地址
Path targetFilePath = Paths.get("targetFile.txt");
try {
    Files.copy(sourceFilePath, targetFilePath,StandardCopyOption.REPLACE_EXISTING);
    System.out.println("文件复制成功");
} catch (IOException e) {
    System.out.println("文件复制失败：" + e.getMessage());
}
```

## 复制目录

```java
// 复制一个目录
Path sourceDirPath = Paths.get("C:/Users/username/Desktop/sourceDir");
Path targetDirPath = Paths.get("C:/Users/username/Desktop/targetDir");
try {
//CopyFileVisitor是需要自己实现的

    Files.walkFileTree(sourceDirPath, new CopyFileVisitor(sourceDirPath, targetDirPath));
    System.out.println("目录复制成功");
} catch (IOException e) {
    System.out.println("目录复制失败：" + e.getMessage());
}
```

CopyFileVisitor

```java
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class CopyFileVisitor extends SimpleFileVisitor<Path> {
    private final Path sourceDir;
    private final Path targetDir;

    public CopyFileVisitor(Path sourceDir, Path targetDir) {
        this.sourceDir = sourceDir;
        this.targetDir = targetDir;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        Path targetPath = targetDir.resolve(sourceDir.relativize(dir));
        try {
            Files.copy(dir, targetPath);
        } catch (FileAlreadyExistsException e) {
            if (!Files.isDirectory(targetPath)) {
                throw e;
            }
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        Path targetPath = targetDir.resolve(sourceDir.relativize(file));
        Files.copy(file, targetPath, StandardCopyOption.REPLACE_EXISTING);
        return FileVisitResult.CONTINUE;
    }
}
```

在preVisitDirectory()方法中，我们将源目录下的子目录逐个创建到目标目录中。在创建过程中，我们使用Files.copy()方法将目录复制到目标目录中。由于目标目录可能已经存在，因此我们在Files.copy()方法中使用了FileAlreadyExistsException异常进行处理。

在visitFile()方法中，我们将源目录下的文件逐个复制到目标目录中。在复制过程中，我们使用Files.copy()方法将文件复制到目标目录中，并使用StandardCopyOption.REPLACE_EXISTING选项替换现有文件。

## 移动或重命名

```java
    try {
    //这个操作可以做移动或重命名
        Files.move(Paths.get("source.txt"),Paths.get("target.txt"), StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
        throw new RuntimeException(e);
    }

```

## 遍历目录

### 第一种遍历方式

```java
Path start = Paths.get("sourceDir");
int maxDepth = Integer.MAX_VALUE;

try {
    Files.walk(start, maxDepth).forEach(System.out::println);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

该方法接受三个参数：

start：表示要遍历的根目录的路径。
maxDepth：表示要遍历的最大深度。如果maxDepth为0，则只遍历根目录，不遍历其子目录。如果maxDepth为正整数，则遍历根目录和所有深度不超过maxDepth的子目录。如果maxDepth为负数，则遍历根目录和所有子目录。
options：表示遍历选项。可选项包括FileVisitOption.FOLLOW_LINKS和FileVisitOption.NOFOLLOW_LINKS。
如果选择FOLLOW_LINKS选项，则遍历符号链接指向的目录；
如果选择NOFOLLOW_LINKS选项，则遍历符号链接本身

### 第二种遍历方式

```java
Path dir = Paths.get("/home/user/newdir");
for (Path entry : Files.list(dir)) {
    System.out.println(entry.getFileName());
}
```


## 获取文件属性

```java
try {
    Path path = Paths.get("F:\\java\\2.txt").toAbsolutePath();
    System.out.println("文件是否存在: " + Files.exists(path));
    System.out.println("是否是目录: " + Files.isDirectory(path));
    System.out.println("是否是可执行文件: " + Files.isExecutable(path));
    System.out.println("是否可读: " + Files.isReadable(path));
    System.out.println("判断是否是一个文件: " + Files.isRegularFile(path));
    System.out.println("是否可写: " + Files.isWritable(path));
    System.out.println("文件是否不存在: " + Files.notExists(path));
    System.out.println("文件是否隐藏: " + Files.isHidden(path));

    System.out.println("文件大小: " + Files.size(path));
    System.out.println("文件存储在SSD还是HDD: " + Files.getFileStore(path));
    System.out.println("文件修改时间：" + Files.getLastModifiedTime(path));
    System.out.println("文件拥有者： " + Files.getOwner(path));
    System.out.println("文件类型: " + Files.probeContentType(path));
} catch (IOException e) {
    throw new RuntimeException(e);
}
```
