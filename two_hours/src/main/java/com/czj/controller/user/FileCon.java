package com.czj.controller.user;

import com.czj.controller.util.CLog;
import com.czj.pojo.com.Chapter;
import com.czj.pojo.com.Course;
import com.czj.pojo.com.User;
import com.czj.service.com.CourseService;
import com.czj.service.com.impl.CourseServiceImpl;
import com.czj.util.UploadUtils;
import com.czj.pojo.com.Resource;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@RestController
@RequestMapping("/Files")
public class FileCon {
    @Autowired
    private CourseService courseService;

    // 项目静态资源绝对路径
    @Value("${myProject.static.userFiles}")
    private String userFiles;

    static class FileU{
        public String fileName;
        public String userId;
    }

    // 对ckeditor的返回结果-特别适配
    @AllArgsConstructor
    class UploadImageResult {
        /**
         * 1成功，0失败
         */
        public Integer uploaded;
        public String fileName;
        public String url;
    }

    /**
     * 上传用户头像
     * @param file MultipartFile file为接收图片参数
     */
    @PostMapping("/userAvatarUpload")
    public String userAvatarUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        // userId获取
        String userId = (String)request.getSession().getAttribute("userId");
        // 项目内部路径组织
        String fileLocation = "/files/user/" + userId + "/avatar/";
        String originalFilename = file.getOriginalFilename();
        String fileName = UploadUtils.getPhotoName("avatar",originalFilename);  // 根据时间生成文件名
        return upload(file,userFiles + userId + "\\avatar\\", fileLocation,fileName);
    }
    /**
     * 上传课程封面
     * @param file MultipartFile file为接收图片参数
     */
    @PostMapping("/courseCoverUpload")
    public String courseCoverUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        // userId获取
        String userId = (String)request.getSession().getAttribute("userId");
        // 项目内部路径组织
        String fileLocation = "/files/user/" + userId + "/cover/";
        String originalFilename = file.getOriginalFilename();
        String fileName = UploadUtils.getPhotoName("cover",originalFilename);  // 根据时间生成文件名
        return upload(file,userFiles + userId + "\\cover\\", fileLocation, fileName);
    }
    /**
     * Ckeditor上传图片
     * @param file MultipartFile file为接收图片参数
     * @return 相对路径
     */
    @PostMapping("/ckeditorImgUpload")
    public UploadImageResult ckeditorImgUpload(@RequestParam("upload") MultipartFile file, HttpServletRequest request) {
        // userId获取
        String userId = (String)request.getSession().getAttribute("userId");
        // 项目内部路径组织
        String fileLocation = "/files/user/" + userId + "/ckeditor/";
        String originalFilename = file.getOriginalFilename();
        String fileName = UploadUtils.getPhotoName("ckeditor",originalFilename);  // 根据时间生成文件名
        String url = upload(file, userFiles + userId + "\\ckeditor\\", fileLocation, fileName);
        return new UploadImageResult(1,fileName,url);
    }
    /**
     * 上传章节视频
     * @param file MultipartFile file为接收图片参数
     */
    @PostMapping("/chapterVideoUpload")
    public String chapterVideoUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        // userId获取
        String userId = (String)request.getSession().getAttribute("userId");
        // 项目内部路径组织
        String fileLocation = "/files/user/" + userId + "/chapter/";
        String originalFilename = file.getOriginalFilename();
        String fileName = UploadUtils.getPhotoName("chapter",originalFilename);  // 根据时间生成文件名
        return upload(file,userFiles + userId + "\\chapter\\", fileLocation, fileName);
    }
    /**
     * 上传课件
     * @param file MultipartFile file为接收文件参数
     */
    @PostMapping("/resourceUpload")
    public String resourceUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        // userId获取
        String userId = (String)request.getSession().getAttribute("userId");
        // 项目内部路径组织
        String fileLocation = "/files/user/" + userId + "/resource/";
        // 获取文件名
        long date = new Date().getTime();
        String dateStr = Long.toString(date);
        /*  System.out.println("*** "+date);
        System.out.println("*** "+date%100000);*/
        // String filename = (date%100000)+ "_" + file.getOriginalFilename();   // 当取余结果第一位数为0时，所得字符串会少一位，即4位
        String filename = dateStr.substring(dateStr.length() - 5) + "_" + file.getOriginalFilename();
        upload(file,userFiles + userId + "\\resource\\", fileLocation,filename);
        return filename;
    }
    /**
     * 删除被替换的封面图片
     * @param course 删除封面
     */
    @PostMapping("/deleteCourseCoverImg")
    public boolean deleteCourseCoverImg(@RequestBody Course course) {
        // 文件名长度
        String fileName = course.getCoverImg();
        String userId = course.getUserId();
        // 截取图片名称
        int begin = fileName.lastIndexOf("cover");
        String name = fileName.substring(begin);
        // 获取文件绝对路径
        String fileLocation =userFiles + userId + "\\cover\\" + name;
        File file = new File(fileLocation);
        boolean delete = file.delete();
        return delete;
    }
    /**
     * 删除被替换的头像资源
     * @param user 删除头像
     */
    @PostMapping("/deleteUserAvatar")
    public boolean deleteUserAvatar(@RequestBody User user) {
        String fileName = user.getUserAvatar();
        // userId获取
        String userId = user.getUserId();
        // 截取图片名称
        int begin = fileName.lastIndexOf("avatar");
        String name = fileName.substring(begin);
        // 获取文件绝对路径
        String fileLocation =userFiles + userId + "\\avatar\\" + name;
        CLog.log("开始删除视频~~~");
        CLog.log(fileLocation);
        File file = new File(fileLocation);
        return file.delete();
    }
    /**
     * 删除被替换的章节视频
     * fixme 路径正常但无法删除文件
     * @param chapter 提供视频路径
     */
    @PostMapping("/deleteChapterVideo")
    public boolean deleteChapterVideo(@RequestBody Chapter chapter) {
        String fileName = chapter.getChapterUrl();
        // userId获取
        String userId = courseService.getById(chapter.getCourseId()).getUserId();
        // 截取章节名称
        int begin = fileName.lastIndexOf("chapter");
        String name = fileName.substring(begin);
        // 获取文件绝对路径
        String fileLocation =userFiles + userId + "\\chapter\\" + name;
        File file = new File(fileLocation);
        return file.delete();
    }
    /**
     * 删除课件
     * @param resource 文件信息-文件名
     */
    @PostMapping("/resourceDelete")
    public boolean resourceDelete(@RequestBody Resource resource) {
        // userId获取
        String userId = courseService.getById(resource.getCourseId()).getUserId();
        // 获取文件名
        String fileName = resource.getResourceName();
        // 获取文件绝对路径
        String fileLocation =userFiles + userId + "\\resource\\" + fileName;
        File file = new File(fileLocation);
        return file.delete();
    }
    /**
     * 删除报告
     * @param resource 文件信息-文件名
     */
    @PostMapping("/reportDelete")
    public boolean reportDelete(@RequestBody Resource resource, HttpServletRequest request) {
        // userId获取
        String userId = (String) request.getSession().getAttribute("userId");
        // 获取文件名
        String fileName = resource.getResourceName();
        // 获取文件绝对路径
        String fileLocation =userFiles + userId + "\\resource\\" + fileName;
        File file = new File(fileLocation);
        boolean delete = file.delete();
        return delete;
    }

    /**
     * 删除用户目录 todo 目录需要递归删除文件
     * @param userId UserID
     * @return Boolean
     */
    public boolean userFileDelete(String userId){
        String location = userFiles + userId;
        File file = new File(location);
        return file.delete();
    }

    /**
     * 课件下载
     * @param fileu 文件名
     */
    @JsonManagedReference
    @PostMapping("/resourceDownload")
    public void resourceDownload(@RequestBody FileU fileu, HttpServletRequest request, HttpServletResponse response){
        try {
            String fileName = fileu.fileName;
            // userId获取
            HttpSession session = request.getSession();
            int courseId = (int) session.getAttribute("courseId");
            Course course = courseService.getById(courseId);
            String userId = course.getUserId();
            // 获取文件绝对路径
            String fileLocation =userFiles + userId + "\\resource\\" + fileName;
            System.out.println(fileLocation);
            // 返回文件的二进制流
            File file = new File(fileLocation);
            if(file.exists()){
                // 设置信息给客户端不解析
                String type = new MimetypesFileTypeMap().getContentType(fileName);
                // 设置contentType，即告诉客户端所发送的数据属于什么类型
                response.setHeader("Content-type",type);
                // 设置编码
                String code = new String(fileName.getBytes("utf-8"), "iso-8859-1");
                // 设置扩展头，当Content-Type 的类型为要下载的类型时 , 这个信息头会告诉浏览器这个文件的名字和类型。
                response.setHeader("Content-Disposition", "attachment;filename=" + code);
                // 设置文件大小 下载下来的excel文件才不会在打开前提示修复
                response.addHeader("Content-Length",String.valueOf(file.length()));
                // 发送给客户端的数据
                OutputStream outputStream = response.getOutputStream();
                byte[] buff = new byte[1024];
                FileInputStream fileInputStream = new FileInputStream(file);
                BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
                int i = bufferedInputStream.read(buff);
                while (i != -1) {
                    outputStream.write(buff, 0, buff.length);
                    outputStream.flush();
                    i = bufferedInputStream.read(buff);
                }
                // 关闭流
                outputStream.close();
                fileInputStream.close();
                bufferedInputStream.close();
                // return dea;
            }else{
                System.out.println("文件不存在!");
                // return new DEA(false);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        // return new DEA(false);
    }
    /**
     * 报告下载 学生下载报告-从自己的userId中获取
     * @param fileu 文件名
     */
    @JsonManagedReference
    @PostMapping("/reportDownload")
    public void reportDownload(@RequestBody FileU fileu, HttpServletRequest request, HttpServletResponse response){
        try {
            String fileName = fileu.fileName;
            // userId获取
            HttpSession session = request.getSession();
            String userId = (String) session.getAttribute("userId");
            // 获取文件绝对路径
            String fileLocation =userFiles + userId + "\\resource\\" + fileName;
            System.out.println(fileLocation);
            // 返回文件的二进制流
            File file = new File(fileLocation);
            if(file.exists()){
                // 设置信息给客户端不解析
                String type = new MimetypesFileTypeMap().getContentType(fileName);
                // 设置contentType，即告诉客户端所发送的数据属于什么类型
                response.setHeader("Content-type",type);
                // 设置编码
                String code = new String(fileName.getBytes("utf-8"), "iso-8859-1");
                // 设置扩展头，当Content-Type 的类型为要下载的类型时 , 这个信息头会告诉浏览器这个文件的名字和类型。
                response.setHeader("Content-Disposition", "attachment;filename=" + code);
                // 设置文件大小 下载下来的excel文件才不会在打开前提示修复
                response.addHeader("Content-Length",String.valueOf(file.length()));
                // 发送给客户端的数据
                OutputStream outputStream = response.getOutputStream();
                byte[] buff = new byte[1024];
                FileInputStream fileInputStream = new FileInputStream(file);
                BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
                int i = bufferedInputStream.read(buff);
                while (i != -1) {
                    outputStream.write(buff, 0, buff.length);
                    outputStream.flush();
                    i = bufferedInputStream.read(buff);
                }
                // 关闭流
                outputStream.close();
                fileInputStream.close();
                bufferedInputStream.close();
                // return dea;
            }else{
                System.out.println("文件不存在!");
                // return new DEA(false);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        // return new DEA(false);
    }
    /**
     * 报告下载 教师下载报告-从学生的userId中获取
     * @param fileu 文件名
     */
    @JsonManagedReference
    @PostMapping("/reportDownloadTec")
    public void reportDownloadTec(@RequestBody FileU fileu, HttpServletRequest request, HttpServletResponse response){
        try {
            String fileName = fileu.fileName;
            // userId获取
            String userId = fileu.userId;
            // 获取文件绝对路径
            String fileLocation =userFiles + userId + "\\resource\\" + fileName;
            System.out.println(fileLocation);
            // 返回文件的二进制流
            File file = new File(fileLocation);
            if(file.exists()){
                // 设置信息给客户端不解析
                String type = new MimetypesFileTypeMap().getContentType(fileName);
                // 设置contentType，即告诉客户端所发送的数据属于什么类型
                response.setHeader("Content-type",type);
                // 设置编码
                String code = new String(fileName.getBytes("utf-8"), "iso-8859-1");
                // 设置扩展头，当Content-Type 的类型为要下载的类型时 , 这个信息头会告诉浏览器这个文件的名字和类型。
                response.setHeader("Content-Disposition", "attachment;filename=" + code);
                // 设置文件大小 下载下来的excel文件才不会在打开前提示修复
                response.addHeader("Content-Length",String.valueOf(file.length()));
                // 发送给客户端的数据
                OutputStream outputStream = response.getOutputStream();
                byte[] buff = new byte[1024];
                FileInputStream fileInputStream = new FileInputStream(file);
                BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
                int i = bufferedInputStream.read(buff);
                while (i != -1) {
                    outputStream.write(buff, 0, buff.length);
                    outputStream.flush();
                    i = bufferedInputStream.read(buff);
                }
                // 关闭流
                outputStream.close();
                fileInputStream.close();
                bufferedInputStream.close();
                // return dea;
            }else{
                System.out.println("文件不存在!");
                // return new DEA(false);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        // return new DEA(false);
    }
    /**
     * 文件上传
     * @param file 文件
     * @param pathname 存入路径-绝对路径
     * @param fileLocation 读取路径-相对路径
     * @param fileName  文件名
     * @return 文件读取路径
     */
    private String upload(MultipartFile file, String pathname, String fileLocation, String fileName){
        try {
            byte[] bytes = file.getBytes();
            // 创建文件路径
            File dest = new File(pathname + fileName);
            // 目录不存在则创建
            if(!dest.getParentFile().exists()){
                boolean success = dest.getParentFile().mkdirs();
                if(!success)throw new IOException();
            }
            // 文件已存在
            if(dest.exists()){
                return null;
            }
            // 创建文件
            Path path = Paths.get(pathname + fileName);
            Files.write(path, bytes);    // 写入文件
            return fileLocation + fileName;  //返回文件路径
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
