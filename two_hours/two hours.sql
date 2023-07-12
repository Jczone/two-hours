/*
 Navicat Premium Data Transfer

 Source Server         : jczone
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : two hours

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 12/07/2023 22:03:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for th_admin
-- ----------------------------
DROP TABLE IF EXISTS `th_admin`;
CREATE TABLE `th_admin`  (
  `admin_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '管理员工号',
  `password` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `telephone` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话号码',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_admin
-- ----------------------------
INSERT INTO `th_admin` VALUES ('admin', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '10000001111');
INSERT INTO `th_admin` VALUES ('root', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '10000001112');

-- ----------------------------
-- Table structure for th_answer
-- ----------------------------
DROP TABLE IF EXISTS `th_answer`;
CREATE TABLE `th_answer`  (
  `answer_id` int(0) NOT NULL AUTO_INCREMENT,
  `exam_id` int(0) NULL DEFAULT NULL,
  `subject_type` int(0) NULL DEFAULT NULL COMMENT '对应题目类型',
  `subject_id` int(0) NULL DEFAULT NULL COMMENT '对应题目id',
  `subject_num` int(0) NULL DEFAULT NULL COMMENT '对应题目序号',
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答题用户id',
  `answer_num` int(0) NULL DEFAULT NULL COMMENT '对应选择/填空的项数目',
  `answer` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户答案',
  `score` int(0) NULL DEFAULT NULL COMMENT '用户所获分数',
  PRIMARY KEY (`answer_id`) USING BTREE,
  INDEX `subject_id`(`subject_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `th_answer_ibfk_3` FOREIGN KEY (`exam_id`) REFERENCES `th_exam` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_answer_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 407 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_answer
-- ----------------------------
INSERT INTO `th_answer` VALUES (298, 1, 1, 1, 1, 'stu023', 1, '1', 0);
INSERT INTO `th_answer` VALUES (299, 1, 1, 2, 2, 'stu023', 1, '3', 4);
INSERT INTO `th_answer` VALUES (300, 1, 1, 3, 3, 'stu023', 1, '7', 6);
INSERT INTO `th_answer` VALUES (301, 1, 1, 8, 4, 'stu023', 5, '', 0);
INSERT INTO `th_answer` VALUES (302, 1, 1, 6, 5, 'stu023', 1, '1', 5);
INSERT INTO `th_answer` VALUES (303, 1, 2, 1, 6, 'stu023', 3, '', 15);
INSERT INTO `th_answer` VALUES (304, 1, 2, 2, 7, 'stu023', 1, '', 0);
INSERT INTO `th_answer` VALUES (305, 1, 2, 3, 8, 'stu023', 3, '', 2);
INSERT INTO `th_answer` VALUES (306, 1, 3, 1, 9, 'stu023', 1, '1', 3);
INSERT INTO `th_answer` VALUES (307, 1, 3, 2, 10, 'stu023', 1, '1', 0);
INSERT INTO `th_answer` VALUES (308, 1, 3, 3, 11, 'stu023', 1, '1', 3);
INSERT INTO `th_answer` VALUES (309, 1, 4, 1, 12, 'stu023', 1, '<p>略</p>\n', 6);
INSERT INTO `th_answer` VALUES (310, 1, 4, 2, 13, 'stu023', 1, '<p>略</p>\n', 1);
INSERT INTO `th_answer` VALUES (311, 1, 4, 3, 14, 'stu023', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (312, 1, 2, 6, 15, 'stu023', 4, '', 3);
INSERT INTO `th_answer` VALUES (313, 1, 1, 1, 1, 'stu013', 1, '4', 4);
INSERT INTO `th_answer` VALUES (314, 1, 1, 2, 2, 'stu013', 1, '3', 4);
INSERT INTO `th_answer` VALUES (315, 1, 1, 3, 3, 'stu013', 1, '7', 6);
INSERT INTO `th_answer` VALUES (316, 1, 1, 8, 4, 'stu013', 5, '', 6);
INSERT INTO `th_answer` VALUES (317, 1, 1, 6, 5, 'stu013', 1, '1', 5);
INSERT INTO `th_answer` VALUES (318, 1, 2, 1, 6, 'stu013', 3, '', 15);
INSERT INTO `th_answer` VALUES (319, 1, 2, 2, 7, 'stu013', 1, '', 5);
INSERT INTO `th_answer` VALUES (320, 1, 2, 3, 8, 'stu013', 3, '', 6);
INSERT INTO `th_answer` VALUES (321, 1, 3, 1, 9, 'stu013', 1, '1', 3);
INSERT INTO `th_answer` VALUES (322, 1, 3, 2, 10, 'stu013', 1, '0', 3);
INSERT INTO `th_answer` VALUES (323, 1, 3, 3, 11, 'stu013', 1, '1', 3);
INSERT INTO `th_answer` VALUES (324, 1, 4, 1, 12, 'stu013', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (325, 1, 4, 2, 13, 'stu013', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (326, 1, 4, 3, 14, 'stu013', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (327, 1, 2, 6, 15, 'stu013', 4, '', 3);
INSERT INTO `th_answer` VALUES (328, 1, 1, 1, 1, 'stu033', 1, '4', 4);
INSERT INTO `th_answer` VALUES (329, 1, 1, 2, 2, 'stu033', 1, '3', 4);
INSERT INTO `th_answer` VALUES (330, 1, 1, 3, 3, 'stu033', 1, '7', 6);
INSERT INTO `th_answer` VALUES (331, 1, 1, 8, 4, 'stu033', 5, '', 0);
INSERT INTO `th_answer` VALUES (332, 1, 1, 6, 5, 'stu033', 1, '1', 5);
INSERT INTO `th_answer` VALUES (333, 1, 2, 1, 6, 'stu033', 3, '', 15);
INSERT INTO `th_answer` VALUES (334, 1, 2, 2, 7, 'stu033', 1, '', 5);
INSERT INTO `th_answer` VALUES (335, 1, 2, 3, 8, 'stu033', 3, '', 6);
INSERT INTO `th_answer` VALUES (336, 1, 3, 1, 9, 'stu033', 1, '1', 3);
INSERT INTO `th_answer` VALUES (337, 1, 3, 2, 10, 'stu033', 1, '0', 3);
INSERT INTO `th_answer` VALUES (338, 1, 3, 3, 11, 'stu033', 1, '1', 3);
INSERT INTO `th_answer` VALUES (339, 1, 4, 1, 12, 'stu033', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (340, 1, 4, 2, 13, 'stu033', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (341, 1, 4, 3, 14, 'stu033', 1, '<p>略</p>\n', 5);
INSERT INTO `th_answer` VALUES (342, 1, 2, 6, 15, 'stu033', 4, '', 3);
INSERT INTO `th_answer` VALUES (343, 1, 1, 1, 1, 'tea002', 1, '2', 0);
INSERT INTO `th_answer` VALUES (344, 1, 1, 2, 2, 'tea002', 1, '2', 0);
INSERT INTO `th_answer` VALUES (345, 1, 1, 3, 3, 'tea002', 1, '7', 6);
INSERT INTO `th_answer` VALUES (346, 1, 1, 8, 4, 'tea002', 5, '', 6);
INSERT INTO `th_answer` VALUES (347, 1, 1, 6, 5, 'tea002', 1, '3', 0);
INSERT INTO `th_answer` VALUES (348, 1, 2, 1, 6, 'tea002', 3, '', 15);
INSERT INTO `th_answer` VALUES (349, 1, 2, 2, 7, 'tea002', 1, '', 5);
INSERT INTO `th_answer` VALUES (350, 1, 2, 3, 8, 'tea002', 3, '', 0);
INSERT INTO `th_answer` VALUES (351, 1, 3, 1, 9, 'tea002', 1, '1', 3);
INSERT INTO `th_answer` VALUES (352, 1, 3, 2, 10, 'tea002', 1, '0', 3);
INSERT INTO `th_answer` VALUES (353, 1, 3, 3, 11, 'tea002', 1, '1', 3);
INSERT INTO `th_answer` VALUES (354, 1, 4, 1, 12, 'tea002', 1, '<p>0</p>\n', 12);
INSERT INTO `th_answer` VALUES (355, 1, 4, 2, 13, 'tea002', 1, '<p>0</p>\n', 12);
INSERT INTO `th_answer` VALUES (356, 1, 4, 3, 14, 'tea002', 1, '<p>0</p>\n', 8);
INSERT INTO `th_answer` VALUES (357, 1, 2, 6, 15, 'tea002', 4, '', 0);
INSERT INTO `th_answer` VALUES (358, 1, 1, 1, 1, 'tea004', 1, '3', 0);
INSERT INTO `th_answer` VALUES (359, 1, 1, 2, 2, 'tea004', 1, '3', 4);
INSERT INTO `th_answer` VALUES (360, 1, 1, 3, 3, 'tea004', 1, '7', 6);
INSERT INTO `th_answer` VALUES (361, 1, 1, 8, 4, 'tea004', 5, '', 0);
INSERT INTO `th_answer` VALUES (362, 1, 1, 6, 5, 'tea004', 1, '1', 5);
INSERT INTO `th_answer` VALUES (363, 1, 2, 1, 6, 'tea004', 3, '', 10);
INSERT INTO `th_answer` VALUES (364, 1, 2, 2, 7, 'tea004', 1, '', 0);
INSERT INTO `th_answer` VALUES (365, 1, 2, 3, 8, 'tea004', 3, '', 2);
INSERT INTO `th_answer` VALUES (366, 1, 3, 1, 9, 'tea004', 1, '0', 0);
INSERT INTO `th_answer` VALUES (367, 1, 3, 2, 10, 'tea004', 1, '1', 0);
INSERT INTO `th_answer` VALUES (368, 1, 3, 3, 11, 'tea004', 1, '1', 3);
INSERT INTO `th_answer` VALUES (369, 1, 4, 1, 12, 'tea004', 1, '<p>no</p>\n', 12);
INSERT INTO `th_answer` VALUES (370, 1, 4, 2, 13, 'tea004', 1, '<p>略</p>\n', 6);
INSERT INTO `th_answer` VALUES (371, 1, 4, 3, 14, 'tea004', 1, '<p>略</p>\n', 12);
INSERT INTO `th_answer` VALUES (372, 1, 2, 6, 15, 'tea004', 4, '', 2);

-- ----------------------------
-- Table structure for th_answer_option
-- ----------------------------
DROP TABLE IF EXISTS `th_answer_option`;
CREATE TABLE `th_answer_option`  (
  `option_id` int(0) NOT NULL AUTO_INCREMENT,
  `answer_id` int(0) NULL DEFAULT NULL COMMENT '对应答案的id',
  `num` int(0) NULL DEFAULT NULL COMMENT '对应题目项的序号',
  `answer` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '选择或填空的答案',
  `score` int(0) NULL DEFAULT NULL COMMENT '用户所获分数',
  PRIMARY KEY (`option_id`) USING BTREE,
  INDEX `answer_id`(`answer_id`) USING BTREE,
  CONSTRAINT `th_answer_option_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `th_answer` (`answer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 393 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_answer_option
-- ----------------------------
INSERT INTO `th_answer_option` VALUES (298, 301, 1, '1', NULL);
INSERT INTO `th_answer_option` VALUES (299, 301, 2, '1', NULL);
INSERT INTO `th_answer_option` VALUES (300, 301, 3, '1', NULL);
INSERT INTO `th_answer_option` VALUES (301, 301, 4, '0', NULL);
INSERT INTO `th_answer_option` VALUES (302, 301, 5, '0', NULL);
INSERT INTO `th_answer_option` VALUES (303, 303, 1, '名可名', NULL);
INSERT INTO `th_answer_option` VALUES (304, 303, 2, '无名天地之始', NULL);
INSERT INTO `th_answer_option` VALUES (305, 303, 3, '有名万物之母', NULL);
INSERT INTO `th_answer_option` VALUES (306, 304, 1, '千门万户曈曈日日日不对哈哈哈', NULL);
INSERT INTO `th_answer_option` VALUES (307, 305, 1, 'Exam', NULL);
INSERT INTO `th_answer_option` VALUES (308, 305, 2, 'Test', NULL);
INSERT INTO `th_answer_option` VALUES (309, 305, 3, 'shiyan', NULL);
INSERT INTO `th_answer_option` VALUES (310, 312, 2, '不飞', NULL);
INSERT INTO `th_answer_option` VALUES (311, 312, 3, '外围机处理方式', NULL);
INSERT INTO `th_answer_option` VALUES (312, 312, 4, '通道控制方式', NULL);
INSERT INTO `th_answer_option` VALUES (313, 312, 5, '程序中断方式', NULL);
INSERT INTO `th_answer_option` VALUES (314, 316, 1, '1', NULL);
INSERT INTO `th_answer_option` VALUES (315, 316, 2, '1', NULL);
INSERT INTO `th_answer_option` VALUES (316, 316, 3, '1', NULL);
INSERT INTO `th_answer_option` VALUES (317, 316, 4, '1', NULL);
INSERT INTO `th_answer_option` VALUES (318, 316, 5, '1', NULL);
INSERT INTO `th_answer_option` VALUES (319, 318, 1, '名可名', NULL);
INSERT INTO `th_answer_option` VALUES (320, 318, 2, '无名天地之始', NULL);
INSERT INTO `th_answer_option` VALUES (321, 318, 3, '有名万物之母', NULL);
INSERT INTO `th_answer_option` VALUES (322, 319, 1, '千门万户曈曈日', NULL);
INSERT INTO `th_answer_option` VALUES (323, 320, 1, 'exam', NULL);
INSERT INTO `th_answer_option` VALUES (324, 320, 2, 'Test', NULL);
INSERT INTO `th_answer_option` VALUES (325, 320, 3, '实验', NULL);
INSERT INTO `th_answer_option` VALUES (326, 327, 2, '程序中断方式        ', NULL);
INSERT INTO `th_answer_option` VALUES (327, 327, 3, '直接存储器存取方式', NULL);
INSERT INTO `th_answer_option` VALUES (328, 327, 4, '通道控制方式', NULL);
INSERT INTO `th_answer_option` VALUES (329, 327, 5, '外围机处理方式', NULL);
INSERT INTO `th_answer_option` VALUES (330, 331, 1, '0', NULL);
INSERT INTO `th_answer_option` VALUES (331, 331, 2, '1', NULL);
INSERT INTO `th_answer_option` VALUES (332, 331, 3, '1', NULL);
INSERT INTO `th_answer_option` VALUES (333, 331, 4, '1', NULL);
INSERT INTO `th_answer_option` VALUES (334, 331, 5, '1', NULL);
INSERT INTO `th_answer_option` VALUES (335, 333, 1, '   名可名   ', NULL);
INSERT INTO `th_answer_option` VALUES (336, 333, 2, '   无名天地之始', NULL);
INSERT INTO `th_answer_option` VALUES (337, 333, 3, '有名万物之母   ', NULL);
INSERT INTO `th_answer_option` VALUES (338, 334, 1, '千门万户曈曈日', NULL);
INSERT INTO `th_answer_option` VALUES (339, 335, 1, 'exam', NULL);
INSERT INTO `th_answer_option` VALUES (340, 335, 2, 'Test', NULL);
INSERT INTO `th_answer_option` VALUES (341, 335, 3, '实验    ', NULL);
INSERT INTO `th_answer_option` VALUES (342, 342, 2, '外围机处理方式', NULL);
INSERT INTO `th_answer_option` VALUES (343, 342, 3, '程序中断方式', NULL);
INSERT INTO `th_answer_option` VALUES (344, 342, 4, '直接存储器存取方式', NULL);
INSERT INTO `th_answer_option` VALUES (345, 342, 5, '程序中断方式', NULL);
INSERT INTO `th_answer_option` VALUES (346, 346, 1, '1', NULL);
INSERT INTO `th_answer_option` VALUES (347, 346, 2, '1', NULL);
INSERT INTO `th_answer_option` VALUES (348, 346, 3, '1', NULL);
INSERT INTO `th_answer_option` VALUES (349, 346, 4, '1', NULL);
INSERT INTO `th_answer_option` VALUES (350, 346, 5, '1', NULL);
INSERT INTO `th_answer_option` VALUES (351, 348, 1, '名可名', NULL);
INSERT INTO `th_answer_option` VALUES (352, 348, 2, '无名天地之始', NULL);
INSERT INTO `th_answer_option` VALUES (353, 348, 3, '有名万物之母', NULL);
INSERT INTO `th_answer_option` VALUES (354, 349, 1, '千门万户曈曈日', NULL);
INSERT INTO `th_answer_option` VALUES (355, 350, 1, '顶顶顶顶', NULL);
INSERT INTO `th_answer_option` VALUES (356, 350, 2, '三生三世', NULL);
INSERT INTO `th_answer_option` VALUES (357, 350, 3, '少时诵诗书', NULL);
INSERT INTO `th_answer_option` VALUES (358, 357, 2, '123', NULL);
INSERT INTO `th_answer_option` VALUES (359, 357, 3, '123', NULL);
INSERT INTO `th_answer_option` VALUES (360, 357, 4, '123', NULL);
INSERT INTO `th_answer_option` VALUES (361, 357, 5, '456', NULL);
INSERT INTO `th_answer_option` VALUES (362, 361, 1, '1', NULL);
INSERT INTO `th_answer_option` VALUES (363, 361, 2, '1', NULL);
INSERT INTO `th_answer_option` VALUES (364, 361, 3, '1', NULL);
INSERT INTO `th_answer_option` VALUES (365, 361, 4, '0', NULL);
INSERT INTO `th_answer_option` VALUES (366, 361, 5, '0', NULL);
INSERT INTO `th_answer_option` VALUES (367, 363, 1, '名可名', NULL);
INSERT INTO `th_answer_option` VALUES (368, 363, 2, '无名天地之始', NULL);
INSERT INTO `th_answer_option` VALUES (369, 363, 3, '有名万物之母嗯', NULL);
INSERT INTO `th_answer_option` VALUES (370, 364, 1, '毕设成绩就要出', NULL);
INSERT INTO `th_answer_option` VALUES (371, 365, 1, 'exam', NULL);
INSERT INTO `th_answer_option` VALUES (372, 365, 2, '实验', NULL);
INSERT INTO `th_answer_option` VALUES (373, 365, 3, 'Test', NULL);
INSERT INTO `th_answer_option` VALUES (374, 372, 2, '直接存储器存取方式', NULL);
INSERT INTO `th_answer_option` VALUES (375, 372, 3, '外围机处理方式', NULL);
INSERT INTO `th_answer_option` VALUES (376, 372, 4, '1234134', NULL);
INSERT INTO `th_answer_option` VALUES (377, 372, 5, '1234322423', NULL);

-- ----------------------------
-- Table structure for th_chapter
-- ----------------------------
DROP TABLE IF EXISTS `th_chapter`;
CREATE TABLE `th_chapter`  (
  `chapter_id` int(0) NOT NULL AUTO_INCREMENT,
  `course_id` int(0) NOT NULL COMMENT '所在课程号',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `views` int(0) NULL DEFAULT 0,
  `likes` int(0) NULL DEFAULT 0,
  `chapter_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`chapter_id`) USING BTREE,
  INDEX `reforcourse`(`course_id`) USING BTREE,
  CONSTRAINT `th_chapter_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 199 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_chapter
-- ----------------------------
INSERT INTO `th_chapter` VALUES (1, 1, '窗外', 41, 17, '/files/user/root/chapter/chapter_2022_05_04083513137.mp4', '2022-05-04 00:35:47');
INSERT INTO `th_chapter` VALUES (2, 1, '休闲', 9, 2, '/files/user/root/chapter/chapter_2022_05_04083552266.mp4', '2022-05-04 00:36:06');
INSERT INTO `th_chapter` VALUES (3, 1, '工作', 10, 3, '/files/user/root/chapter/chapter_2022_05_04083614181.mp4', '2022-05-04 00:36:15');
INSERT INTO `th_chapter` VALUES (4, 1, '加班', 6, 2, '/files/user/root/chapter/chapter_2022_05_04083641467.mp4', '2022-05-04 00:36:43');
INSERT INTO `th_chapter` VALUES (181, 7, '第一章 Java课程简介', 21, 2, '/files/user/stu023/chapter/chapter_2023_07_09174923895.mp4', '2023-07-09 09:49:44');
INSERT INTO `th_chapter` VALUES (182, 7, '第二章 ASCII编码', 3, 1, '/files/user/stu023/chapter/chapter_2023_07_09175043122.mp4', '2023-07-09 09:50:54');
INSERT INTO `th_chapter` VALUES (183, 7, '第三章 关键字和标志符', 2, 0, '/files/user/stu023/chapter/chapter_2023_07_09175104068.mp4', '2023-07-09 09:51:15');
INSERT INTO `th_chapter` VALUES (184, 7, '第四章 面向对象进阶介绍', 0, 0, '/files/user/stu023/chapter/chapter_2023_07_09175414525.mp4', '2023-07-09 09:54:24');
INSERT INTO `th_chapter` VALUES (185, 2, '第一章 计算机发展历史', 1, 1, '/files/user/root/chapter/chapter_2023_07_11210439514.mp4', '2023-07-11 13:05:00');
INSERT INTO `th_chapter` VALUES (186, 2, '第二章 计算机启动过程', 0, 0, '/files/user/root/chapter/chapter_2023_07_11210511015.mp4', '2023-07-11 13:05:18');
INSERT INTO `th_chapter` VALUES (187, 2, '第三章 计算机内存', 0, 0, '/files/user/root/chapter/chapter_2023_07_11210530996.mp4', '2023-07-11 13:05:40');
INSERT INTO `th_chapter` VALUES (188, 2, '第四章 计算机指令', 0, 0, '/files/user/root/chapter/chapter_2023_07_11210548792.mp4', '2023-07-11 13:05:57');
INSERT INTO `th_chapter` VALUES (189, 2, '第五章 静态链接', 0, 0, '/files/user/root/chapter/chapter_2023_07_11210605627.mp4', '2023-07-11 13:06:12');
INSERT INTO `th_chapter` VALUES (191, 3, '第一章 微机组成', 0, 0, '/files/user/root/chapter/chapter_2023_07_11211157325.mp4', '2023-07-11 13:12:05');
INSERT INTO `th_chapter` VALUES (192, 3, '第二章 CPU内部结构', 0, 0, '/files/user/root/chapter/chapter_2023_07_11211213942.mp4', '2023-07-11 13:12:21');
INSERT INTO `th_chapter` VALUES (193, 3, '第三章 堆栈', 0, 0, '/files/user/root/chapter/chapter_2023_07_11211227491.mp4', '2023-07-11 13:12:36');
INSERT INTO `th_chapter` VALUES (194, 3, '第四章 时序与总线操作', 0, 0, '/files/user/root/chapter/chapter_2023_07_11211243906.mp4', '2023-07-11 13:12:50');
INSERT INTO `th_chapter` VALUES (195, 3, '第五章 存储和地址空间', 0, 0, '/files/user/root/chapter/chapter_2023_07_11211828258.mp4', '2023-07-11 13:13:50');
INSERT INTO `th_chapter` VALUES (196, 4, '01 单片机结构', 0, 0, '/files/user/root/chapter/chapter_2023_07_11212510147.mp4', '2023-07-11 13:25:15');
INSERT INTO `th_chapter` VALUES (197, 4, '02 单片机性能', 0, 0, '/files/user/root/chapter/chapter_2023_07_11212522642.mp4', '2023-07-11 13:25:28');
INSERT INTO `th_chapter` VALUES (198, 4, '03 JD51型单片机实验', 0, 0, '/files/user/root/chapter/chapter_2023_07_11212535701.mp4', '2023-07-11 13:25:41');
INSERT INTO `th_chapter` VALUES (199, 4, '04 硬件功能', 0, 0, '/files/user/root/chapter/chapter_2023_07_11212546527.mp4', '2023-07-11 13:25:51');

-- ----------------------------
-- Table structure for th_chapter_like_records
-- ----------------------------
DROP TABLE IF EXISTS `th_chapter_like_records`;
CREATE TABLE `th_chapter_like_records`  (
  `record_id` int(0) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(0) NULL DEFAULT NULL,
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`record_id`) USING BTREE,
  INDEX `discussion_id`(`chapter_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `th_chapter_like_records_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_chapter_like_records_ibfk_3` FOREIGN KEY (`chapter_id`) REFERENCES `th_chapter` (`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_chapter_like_records
-- ----------------------------
INSERT INTO `th_chapter_like_records` VALUES (39, 3, 'stu023');
INSERT INTO `th_chapter_like_records` VALUES (40, 2, 'stu023');
INSERT INTO `th_chapter_like_records` VALUES (42, 1, 'stu023');
INSERT INTO `th_chapter_like_records` VALUES (43, 4, 'stu023');
INSERT INTO `th_chapter_like_records` VALUES (44, 3, 'stu013');
INSERT INTO `th_chapter_like_records` VALUES (45, 4, 'stu013');
INSERT INTO `th_chapter_like_records` VALUES (61, 181, 'stu022');
INSERT INTO `th_chapter_like_records` VALUES (62, 182, 'stu022');
INSERT INTO `th_chapter_like_records` VALUES (63, 181, 'stu013');
INSERT INTO `th_chapter_like_records` VALUES (64, 1, 'stu003');
INSERT INTO `th_chapter_like_records` VALUES (65, 2, 'stu003');
INSERT INTO `th_chapter_like_records` VALUES (66, 3, 'stu003');
INSERT INTO `th_chapter_like_records` VALUES (67, 185, 'stu023');

-- ----------------------------
-- Table structure for th_choice
-- ----------------------------
DROP TABLE IF EXISTS `th_choice`;
CREATE TABLE `th_choice`  (
  `subject_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '选择题id',
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '题目',
  `answer_num` int(0) NULL DEFAULT NULL COMMENT '答案个数',
  `analysis` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案解析',
  `score` int(0) NULL DEFAULT NULL COMMENT '分值',
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_choice
-- ----------------------------
INSERT INTO `th_choice` VALUES (1, '计算机系统中的存贮器系统是指', 2, '无解析', 4);
INSERT INTO `th_choice` VALUES (2, '计算机使用总线结构的主要优点是便于实现积木化，同时', 1, '无解析', 4);
INSERT INTO `th_choice` VALUES (3, '假定下列字符码中有奇偶校验位，但没有数据错误，采用偶校校验的字符码是\n', 4, '无解析，嗯，确实没有', 6);
INSERT INTO `th_choice` VALUES (6, '什么是存储器的带宽？若存储器的数据总线宽度为32位，存取周期为200ns，则存储器的带宽是多少？\n', 4, '存储器的带宽指单位时间内从存储器进出信息的最大数量', 5);
INSERT INTO `th_choice` VALUES (7, '某机字长32位，其中1位符号位，31位表示尾数。若用定点小数表示，则最大正小数为______。\n', 4, '无解析', 4);
INSERT INTO `th_choice` VALUES (8, '冯诺依曼型计算机规定计算机由几个部件组成，分别是\n', 5, '<p>也没解析</p>\n', 6);
INSERT INTO `th_choice` VALUES (11, '<p>中国共产党的诞生日期</p>\n', 4, '<p>1921浙江嘉兴南湖</p>\n', 5);
INSERT INTO `th_choice` VALUES (13, '<p>一道选择</p>\n', 4, '<p>解析</p>\n', 5);

-- ----------------------------
-- Table structure for th_choice_option
-- ----------------------------
DROP TABLE IF EXISTS `th_choice_option`;
CREATE TABLE `th_choice_option`  (
  `option_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '选项id',
  `subject_id` int(0) NULL DEFAULT NULL COMMENT '选择题id',
  `num` int(0) NULL DEFAULT NULL COMMENT '序号',
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  `is_answer` bit(1) NULL DEFAULT NULL COMMENT '0-不是答案 1-是答案',
  PRIMARY KEY (`option_id`) USING BTREE,
  INDEX `subject_id`(`subject_id`) USING BTREE,
  CONSTRAINT `th_choice_option_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `th_choice` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_choice_option
-- ----------------------------
INSERT INTO `th_choice_option` VALUES (5, 2, 1, '减少了信息传输量\r\n', b'0');
INSERT INTO `th_choice_option` VALUES (6, 2, 2, '提高了信息传输的速度', b'0');
INSERT INTO `th_choice_option` VALUES (7, 2, 3, '减少了信息传输线的条数', b'1');
INSERT INTO `th_choice_option` VALUES (8, 2, 4, '加重了CPU的工作量', b'0');
INSERT INTO `th_choice_option` VALUES (28, 7, 1, '+（1 – 2-32）', b'0');
INSERT INTO `th_choice_option` VALUES (29, 7, 2, ' +（1 – 2-31）', b'1');
INSERT INTO `th_choice_option` VALUES (30, 7, 3, '2-32 ', b'0');
INSERT INTO `th_choice_option` VALUES (31, 7, 4, '2-31', b'0');
INSERT INTO `th_choice_option` VALUES (41, 1, 1, 'ROM存储器', b'0');
INSERT INTO `th_choice_option` VALUES (42, 1, 2, 'RAM存储器', b'0');
INSERT INTO `th_choice_option` VALUES (43, 1, 3, '主存储器', b'0');
INSERT INTO `th_choice_option` VALUES (44, 1, 4, '主存储器和外存储器', b'1');
INSERT INTO `th_choice_option` VALUES (72, 3, 1, '11001011', b'0');
INSERT INTO `th_choice_option` VALUES (73, 3, 5, '11010110', b'0');
INSERT INTO `th_choice_option` VALUES (74, 3, 6, '11000001', b'0');
INSERT INTO `th_choice_option` VALUES (75, 3, 7, '11001001', b'1');
INSERT INTO `th_choice_option` VALUES (76, 8, 1, '存储器', b'1');
INSERT INTO `th_choice_option` VALUES (77, 8, 2, '运算器', b'1');
INSERT INTO `th_choice_option` VALUES (78, 8, 3, '控制器', b'1');
INSERT INTO `th_choice_option` VALUES (79, 8, 4, '输入设备', b'1');
INSERT INTO `th_choice_option` VALUES (80, 8, 5, '输出设备', b'1');
INSERT INTO `th_choice_option` VALUES (81, 6, 1, '20MB/秒', b'1');
INSERT INTO `th_choice_option` VALUES (82, 6, 2, '200MB/秒', b'0');
INSERT INTO `th_choice_option` VALUES (83, 6, 3, '40MB/秒', b'0');
INSERT INTO `th_choice_option` VALUES (84, 6, 4, '400MB/秒', b'0');
INSERT INTO `th_choice_option` VALUES (101, 11, 1, '1921-7-1', b'1');
INSERT INTO `th_choice_option` VALUES (102, 11, 2, '1921-8-1', b'0');
INSERT INTO `th_choice_option` VALUES (103, 11, 3, '1921-9-1', b'0');
INSERT INTO `th_choice_option` VALUES (104, 11, 5, '1921-12-10', b'0');
INSERT INTO `th_choice_option` VALUES (115, 13, 3, '123', b'0');
INSERT INTO `th_choice_option` VALUES (116, 13, 4, '234', b'1');
INSERT INTO `th_choice_option` VALUES (117, 13, 5, '234', b'0');
INSERT INTO `th_choice_option` VALUES (118, 13, 8, '44432', b'0');

-- ----------------------------
-- Table structure for th_course
-- ----------------------------
DROP TABLE IF EXISTS `th_course`;
CREATE TABLE `th_course`  (
  `course_id` int(0) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_start` bit(1) NULL DEFAULT NULL COMMENT '1真0假',
  `is_public` bit(1) NULL DEFAULT NULL COMMENT '1真0假',
  `cover_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `describes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`course_id`) USING BTREE,
  INDEX `courseforuser`(`user_id`) USING BTREE,
  CONSTRAINT `courseforuser` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_course
-- ----------------------------
INSERT INTO `th_course` VALUES (1, '新手教程', 'root', b'1', b'1', '/files/user/root/cover/cover_2022_05_10140956579.png', '指导萌新入门的有趣课堂', '2022-04-01 00:00:03');
INSERT INTO `th_course` VALUES (2, '计算机组成原理', 'root', b'1', b'1', '/files/user/root/cover/cover_2022_05_10135931757.png', '教授计算机组成原理', '2022-04-06 16:37:59');
INSERT INTO `th_course` VALUES (3, '微机原理与汇编', 'root', b'1', b'1', '/files/user/root/cover/cover_2023_07_11155112304.jpg', '教授微机原理和汇编技术', '2022-04-06 16:38:37');
INSERT INTO `th_course` VALUES (4, '单片机原理', 'root', b'1', b'1', '/files/user/root/cover/cover_2022_05_10140012857.png', '教授编译原理', '2022-04-06 16:39:08');
INSERT INTO `th_course` VALUES (5, '计算系统的局限性', 'root', b'1', b'1', '/files/user/root/cover/cover_2022_05_10140023701.png', '设计电子电路', '2022-04-09 22:12:10');
INSERT INTO `th_course` VALUES (7, '测试课程', 'stu023', b'1', b'1', '/files/user/stu023/cover/cover_2023_07_11173527754.jpg', '高级程序设计基础课程，主要学习程序设计的基本方法和过程。\n', '2022-04-10 12:57:08');
INSERT INTO `th_course` VALUES (8, '数据结构', 'stu023', b'1', b'0', '/imgs/course/default.jpg', 'hello,数据结构', '2022-04-10 12:57:39');
INSERT INTO `th_course` VALUES (9, '计算机组成原理', 'tea002', b'0', b'0', '/files/user/tea002/cover/cover_2022_05_10144537956.png', '学习物理知识', '2022-04-09 22:13:36');
INSERT INTO `th_course` VALUES (13, '大型硬件实验', 'tea002', b'1', b'1', '/files/user/tea002/cover/cover_2022_05_10144521167.png', '硬件实验周', '2022-04-12 11:53:44');
INSERT INTO `th_course` VALUES (14, '通信原理', 'tea002', b'1', b'1', '/files/user/tea002/cover/cover_2022_05_10144615844.jpg', '研究通信的原理和技术', '2022-04-01 11:53:49');
INSERT INTO `th_course` VALUES (15, '高等数学', 'tea001', b'1', b'1', '/files/user/tea001/cover/cover_2022_05_10154650256.png', '研究微积分', '2022-04-01 15:53:52');
INSERT INTO `th_course` VALUES (16, '电工技术', 'tea003', b'1', b'1', '/files/user/tea003/cover/cover_2022_05_10155140528.png', '电工技术学习', '2022-04-03 11:54:03');
INSERT INTO `th_course` VALUES (17, '电路实验', 'tea004', b'1', b'0', '/files/user/tea004/cover/cover_2022_05_10154816203.png', '电路研究和设计', '2022-04-05 11:54:09');
INSERT INTO `th_course` VALUES (18, '计算机网络', 'tea002', b'1', b'1', '/files/user/tea002/cover/cover_2022_05_10144625624.jpg', '计算机网络技术', '2022-03-31 11:54:12');
INSERT INTO `th_course` VALUES (19, '操作系统', 'tea001', b'0', b'0', '/imgs/course/default.jpg', '操作系统的运行和组织', '2022-04-11 11:54:16');
INSERT INTO `th_course` VALUES (20, '计算机前沿', 'tea003', b'1', b'1', '/imgs/course/default.jpg', '计算机前沿理论知识学习', '2022-04-01 11:54:25');
INSERT INTO `th_course` VALUES (22, '计算机应用技术', 'tea003', b'1', b'1', '/imgs/course/default.jpg', '测试', '2022-04-18 14:26:26');
INSERT INTO `th_course` VALUES (23, '计算机组成原理', 'tea004', b'1', b'1', '/imgs/course/default.jpg', '教授计算机的深层理论知识', '2022-04-06 16:36:18');

-- ----------------------------
-- Table structure for th_course_user
-- ----------------------------
DROP TABLE IF EXISTS `th_course_user`;
CREATE TABLE `th_course_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `course_id` int(0) NOT NULL COMMENT '课程id',
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `res_dl_num` int(0) NULL DEFAULT 0 COMMENT '资源下载数',
  `discussion_create_num` int(0) NULL DEFAULT 0 COMMENT '讨论创建数',
  `chapter_view_time` int(0) NULL DEFAULT 0 COMMENT '章节观看时长',
  `chapter_view_num` int(0) NULL DEFAULT 0 COMMENT '章节观看次数',
  `reply_num` int(0) NULL DEFAULT 0 COMMENT '发表回复数',
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cuforcourse`(`course_id`) USING BTREE,
  INDEX `cuforuser`(`user_id`) USING BTREE,
  CONSTRAINT `cuforcourse` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cuforuser` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 168 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_course_user
-- ----------------------------
INSERT INTO `th_course_user` VALUES (6, 4, 'stu023', 0, 0, 0, 0, 0, '2022-05-03 09:26:07');
INSERT INTO `th_course_user` VALUES (8, 5, 'stu023', 0, 0, 0, 0, 0, '2022-05-04 09:26:10');
INSERT INTO `th_course_user` VALUES (14, 1, 'stu003', 0, 0, 0, 0, 0, '2022-05-04 09:26:29');
INSERT INTO `th_course_user` VALUES (15, 1, 'stu033', 0, 0, 0, 0, 0, '2022-05-02 09:26:33');
INSERT INTO `th_course_user` VALUES (16, 1, 'stu043', 0, 0, 0, 0, 0, '2022-05-01 09:25:41');
INSERT INTO `th_course_user` VALUES (78, 1, 'stu013', 0, 0, 0, 0, 0, '2022-05-04 09:26:29');
INSERT INTO `th_course_user` VALUES (85, 3, 'stu023', 0, 0, 0, 0, 0, '2022-05-02 09:26:33');
INSERT INTO `th_course_user` VALUES (86, 2, 'stu023', 0, 0, 0, 0, 0, '2022-05-01 09:25:41');
INSERT INTO `th_course_user` VALUES (88, 1, 'stu023', 0, 0, 0, 0, 0, '2022-05-03 09:26:07');
INSERT INTO `th_course_user` VALUES (89, 13, 'stu023', 20, 1, 0, 22, 56, '2022-05-04 09:26:10');
INSERT INTO `th_course_user` VALUES (108, 2, 'stu013', 0, 0, 0, 0, 0, '2022-05-10 06:48:11');
INSERT INTO `th_course_user` VALUES (109, 4, 'stu013', 0, 0, 0, 0, 0, '2022-05-10 06:48:14');
INSERT INTO `th_course_user` VALUES (110, 3, 'stu013', 0, 0, 0, 0, 0, '2022-05-10 06:48:17');
INSERT INTO `th_course_user` VALUES (111, 5, 'stu013', 0, 0, 0, 0, 0, '2022-05-10 06:48:19');
INSERT INTO `th_course_user` VALUES (112, 7, 'stu013', 12, 2, 20, 5, 13, '2022-05-10 06:50:57');
INSERT INTO `th_course_user` VALUES (118, 1, 'tea001', 0, 0, 0, 0, 0, '2022-05-10 07:34:35');
INSERT INTO `th_course_user` VALUES (119, 2, 'tea001', 0, 0, 0, 0, 0, '2022-05-10 07:34:39');
INSERT INTO `th_course_user` VALUES (120, 3, 'tea001', 0, 0, 0, 0, 0, '2022-05-10 07:34:41');
INSERT INTO `th_course_user` VALUES (121, 4, 'tea001', 0, 0, 0, 0, 0, '2022-05-10 07:34:44');
INSERT INTO `th_course_user` VALUES (122, 5, 'tea001', 0, 0, 0, 0, 0, '2022-05-10 07:34:47');
INSERT INTO `th_course_user` VALUES (124, 1, 'tea002', 0, 0, 0, 0, 0, '2022-05-10 07:36:24');
INSERT INTO `th_course_user` VALUES (125, 2, 'tea002', 0, 0, 0, 0, 0, '2022-05-10 07:36:27');
INSERT INTO `th_course_user` VALUES (126, 7, 'tea002', 2, 6, 0, 11, 0, '2022-05-10 07:36:30');
INSERT INTO `th_course_user` VALUES (127, 1, 'tea003', 0, 0, 0, 0, 0, '2022-05-10 07:40:17');
INSERT INTO `th_course_user` VALUES (128, 2, 'tea003', 0, 0, 0, 0, 0, '2022-05-10 07:40:20');
INSERT INTO `th_course_user` VALUES (129, 7, 'tea003', 9, 0, 45, 0, 3, '2022-05-10 07:40:23');
INSERT INTO `th_course_user` VALUES (130, 1, 'tea004', 0, 0, 0, 0, 0, '2022-05-10 07:42:39');
INSERT INTO `th_course_user` VALUES (131, 2, 'tea004', 0, 0, 0, 0, 0, '2022-05-10 07:42:42');
INSERT INTO `th_course_user` VALUES (132, 7, 'tea004', 1, 7, 70, 0, 1, '2022-05-10 07:42:45');
INSERT INTO `th_course_user` VALUES (133, 4, 'tea004', 0, 0, 0, 0, 0, '2022-05-10 07:42:48');
INSERT INTO `th_course_user` VALUES (134, 3, 'tea004', 0, 0, 0, 0, 0, '2022-05-10 07:42:50');
INSERT INTO `th_course_user` VALUES (135, 5, 'tea004', 0, 0, 0, 0, 0, '2022-05-10 07:42:53');
INSERT INTO `th_course_user` VALUES (138, 7, 'tea001', 11, 3, 0, 15, 5, '2022-05-16 03:34:02');
INSERT INTO `th_course_user` VALUES (139, 2, 'stu033', 0, 0, 0, 0, 0, '2022-05-20 09:38:08');
INSERT INTO `th_course_user` VALUES (140, 3, 'stu033', 0, 0, 0, 0, 0, '2022-05-20 09:38:11');
INSERT INTO `th_course_user` VALUES (141, 4, 'stu033', 0, 0, 0, 0, 0, '2022-05-20 09:38:15');
INSERT INTO `th_course_user` VALUES (142, 5, 'stu033', 0, 0, 0, 0, 0, '2022-05-20 09:38:17');
INSERT INTO `th_course_user` VALUES (156, 1, 'stu022', 0, 0, 0, 0, 0, '2022-05-31 17:52:40');
INSERT INTO `th_course_user` VALUES (157, 2, 'stu022', 0, 0, 0, 0, 0, '2022-05-31 17:52:40');
INSERT INTO `th_course_user` VALUES (158, 3, 'stu022', 0, 0, 0, 0, 0, '2022-05-31 17:52:40');
INSERT INTO `th_course_user` VALUES (159, 4, 'stu022', 0, 0, 0, 0, 0, '2022-05-31 17:52:40');
INSERT INTO `th_course_user` VALUES (160, 5, 'stu022', 0, 0, 0, 0, 0, '2022-05-31 17:52:40');
INSERT INTO `th_course_user` VALUES (162, 7, 'stu022', 0, 0, 0, 0, 0, '2022-05-31 18:09:52');
INSERT INTO `th_course_user` VALUES (163, 23, 'stu023', 0, 0, 0, 0, 0, '2022-05-31 18:18:56');
INSERT INTO `th_course_user` VALUES (164, 14, 'stu023', 0, 0, 0, 0, 0, '2022-05-31 18:35:53');
INSERT INTO `th_course_user` VALUES (166, 7, 'root', 0, 0, 0, 0, 0, '2023-07-11 02:55:19');
INSERT INTO `th_course_user` VALUES (167, 7, 'stu003', 0, 0, 0, 0, 0, '2023-07-11 06:59:10');
INSERT INTO `th_course_user` VALUES (168, 7, 'stu023', 0, 0, 0, 0, 0, '2023-07-11 22:32:48');

-- ----------------------------
-- Table structure for th_discussion
-- ----------------------------
DROP TABLE IF EXISTS `th_discussion`;
CREATE TABLE `th_discussion`  (
  `discussion_id` int(0) NOT NULL AUTO_INCREMENT,
  `course_id` int(0) NOT NULL,
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `hits` int(0) NULL DEFAULT NULL,
  `likes` int(0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`discussion_id`) USING BTREE,
  INDEX `disforcourse`(`course_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `disforcourse` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_discussion_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_discussion
-- ----------------------------
INSERT INTO `th_discussion` VALUES (19, 7, 'stu023', '讨论区文本测试', '<p>等你，在雨中，在造虹的雨中</p>\n\n<p>蝉声沉落，蛙声升起</p>\n\n<p>一池的红莲如红焰，在雨中</p>\n\n<p>你来不来都一样，竟感觉</p>\n\n<p>每朵莲都像你</p>\n\n<p>尤其隔着黄昏，隔着这样的细雨</p>\n\n<p>永恒，刹那，刹那，永恒</p>\n\n<p>等你，在时间之外，</p>\n\n<p>在时间之内，等你，在刹那，在永恒</p>\n\n<p>如果你的手在我的手里，此刻</p>\n\n<p>如果你的清芬</p>\n\n<p>在我的鼻孔，我会说，小情人</p>\n\n<p>诺，这只手应该采莲，在吴宫</p>\n\n<p>这只手应该</p>\n\n<p>摇一柄桂桨，在木兰舟中</p>\n\n<p>一颗星悬在科学馆的飞檐</p>\n\n<p>耳坠子一般的悬着</p>\n\n<p>瑞士表说都七点了。忽然你走来</p>\n\n<p>步雨后的红莲，翩翩，你走来</p>\n\n<p>像一首小令</p>\n\n<p>从一则爱情的典故里你走来</p>\n\n<p>从姜白石的词里，有韵地，你走来</p>\n', 6, 0, '2023-07-10 04:19:04');
INSERT INTO `th_discussion` VALUES (20, 7, 'stu023', '讨论区图片测试', '<p><img alt=\"\" height=\"416\" src=\"/files/user/stu023/ckeditor/ckeditor_2023_07_10122222973.jpg\" width=\"680\" /></p>\n', 5, 0, '2023-07-10 04:22:44');
INSERT INTO `th_discussion` VALUES (21, 7, 'stu022', '学生发布讨论测试', '<div>这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本</div>\n\n<div>这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本</div>\n\n<div>这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本</div>\n\n<div>这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本&nbsp;这是占位文本</div>\n', 6, 0, '2023-07-10 04:30:11');
INSERT INTO `th_discussion` VALUES (22, 7, 'stu013', '栈和队列', '<div>在线性表中，栈和队列是我们要掌握的重要知识点，关于这两者的区别，大家可以在下面说说自己的看法吗</div>\n\n<p><img alt=\"\" height=\"306\" src=\"/files/user/stu013/ckeditor/ckeditor_2023_07_11103122185.jpg\" width=\"642\" /></p>\n', 6, 2, '2023-07-11 02:31:39');

-- ----------------------------
-- Table structure for th_discussion_like_records
-- ----------------------------
DROP TABLE IF EXISTS `th_discussion_like_records`;
CREATE TABLE `th_discussion_like_records`  (
  `record_id` int(0) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(0) NULL DEFAULT NULL,
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`record_id`) USING BTREE,
  INDEX `discussion_id`(`discussion_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `th_discussion_like_records_ibfk_1` FOREIGN KEY (`discussion_id`) REFERENCES `th_discussion` (`discussion_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_discussion_like_records_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_discussion_like_records
-- ----------------------------
INSERT INTO `th_discussion_like_records` VALUES (28, 22, 'stu013');
INSERT INTO `th_discussion_like_records` VALUES (29, 22, 'stu003');

-- ----------------------------
-- Table structure for th_exam
-- ----------------------------
DROP TABLE IF EXISTS `th_exam`;
CREATE TABLE `th_exam`  (
  `exam_id` int(0) NOT NULL AUTO_INCREMENT,
  `course_id` int(0) NULL DEFAULT NULL COMMENT '所属课程',
  `author_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作者-管理/老师',
  `type` int(0) NULL DEFAULT NULL COMMENT '1-小测 2-作业 3-考试',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标题',
  `detail` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '说明',
  `not_order` int(0) NULL DEFAULT NULL COMMENT '打乱题序',
  `begin_date` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_date` datetime(0) NULL DEFAULT NULL COMMENT '截止时间',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`exam_id`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  INDEX `author_id`(`author_id`) USING BTREE,
  CONSTRAINT `th_exam_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_exam
-- ----------------------------
INSERT INTO `th_exam` VALUES (1, 7, '1807004023', 3, '第一周测试', '<p>测试内容：进制转换和数据类型</p>\n', 0, '2022-05-16 16:00:00', '2022-05-25 16:00:00', '2022-05-31 18:40:31');
INSERT INTO `th_exam` VALUES (2, 7, '1807004023', 3, '第二周测试', '<p>测试内容：循环结构和判断结构</p>\n', 1, '2022-06-01 16:00:00', '2022-06-13 16:00:00', '2022-05-31 18:00:50');

-- ----------------------------
-- Table structure for th_experiment
-- ----------------------------
DROP TABLE IF EXISTS `th_experiment`;
CREATE TABLE `th_experiment`  (
  `experiment_id` int(0) NOT NULL AUTO_INCREMENT,
  `course_id` int(0) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`experiment_id`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  CONSTRAINT `th_experiment_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_experiment
-- ----------------------------
INSERT INTO `th_experiment` VALUES (27, 7, '实验一 最大子序列交替和', '23417_任务书.docx', '2023-07-11 08:46:20');
INSERT INTO `th_experiment` VALUES (28, 7, '实验二 最长回文子串', '69435_任务书.docx', '2023-07-11 08:50:59');

-- ----------------------------
-- Table structure for th_filling
-- ----------------------------
DROP TABLE IF EXISTS `th_filling`;
CREATE TABLE `th_filling`  (
  `subject_id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '题目',
  `answer_num` int(0) NULL DEFAULT NULL COMMENT '答案数/填空数',
  `analysis` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '解析',
  `score` int(0) NULL DEFAULT NULL COMMENT '分值',
  `is_order` bit(1) NULL DEFAULT NULL COMMENT '是否有序1',
  `is_capital` bit(1) NULL DEFAULT NULL COMMENT '是否大写1',
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_filling
-- ----------------------------
INSERT INTO `th_filling` VALUES (1, '<p>道可道，非常道，______，非常名。______，________。</p>\n', 3, '无解析', 15, b'1', b'0');
INSERT INTO `th_filling` VALUES (2, '春风送暖入屠苏，_______。', 1, '无解析', 5, b'0', b'0');
INSERT INTO `th_filling` VALUES (3, '_____,______,______', 3, '无解析', 6, b'1', b'1');
INSERT INTO `th_filling` VALUES (5, '<p>影响流水线性能的因素主要有哪几种？请简要加以说明</p>\n', 3, '<p>无解析</p>\n', 6, b'1', b'1');
INSERT INTO `th_filling` VALUES (6, '<p>输入输出设备数据传送控制方式有五种，比如程序查询方式、_____、_____、_____、_____、</p>\n', 4, '<p>加油</p>\n', 4, b'0', b'0');

-- ----------------------------
-- Table structure for th_filling_blank
-- ----------------------------
DROP TABLE IF EXISTS `th_filling_blank`;
CREATE TABLE `th_filling_blank`  (
  `blank_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '空数id',
  `subject_id` int(0) NULL DEFAULT NULL COMMENT '填空题id',
  `num` int(0) NULL DEFAULT NULL COMMENT '序号',
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  PRIMARY KEY (`blank_id`) USING BTREE,
  INDEX `subject_id`(`subject_id`) USING BTREE,
  CONSTRAINT `th_filling_blank_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `th_filling` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_filling_blank
-- ----------------------------
INSERT INTO `th_filling_blank` VALUES (7, 5, 1, '结构相关：是当多条指令进入流水线后，硬件资源满足不了指令重叠执行的要求时产生的。不同指令争用同一功能部件产生资源冲突');
INSERT INTO `th_filling_blank` VALUES (8, 5, 2, '数据相关：是指令在流水线中重叠执行时，当后继指令需要用到前面指令的执行结果时发生的。可能改变对操作数的读写访问顺序');
INSERT INTO `th_filling_blank` VALUES (9, 5, 3, '控制相关：是当流水线遇到分支指令和其它改变PC值的指令时引起的。');
INSERT INTO `th_filling_blank` VALUES (23, 2, 1, '千门万户曈曈日');
INSERT INTO `th_filling_blank` VALUES (24, 3, 1, 'exam');
INSERT INTO `th_filling_blank` VALUES (25, 3, 2, 'Test');
INSERT INTO `th_filling_blank` VALUES (26, 3, 3, '实验');
INSERT INTO `th_filling_blank` VALUES (27, 1, 1, '名可名');
INSERT INTO `th_filling_blank` VALUES (28, 1, 2, '无名天地之始');
INSERT INTO `th_filling_blank` VALUES (29, 1, 3, '有名万物之母');
INSERT INTO `th_filling_blank` VALUES (30, 6, 2, '程序中断方式');
INSERT INTO `th_filling_blank` VALUES (31, 6, 3, '直接存储器存取方式');
INSERT INTO `th_filling_blank` VALUES (32, 6, 4, '通道控制方式');
INSERT INTO `th_filling_blank` VALUES (33, 6, 5, '外围机处理方式');

-- ----------------------------
-- Table structure for th_notice
-- ----------------------------
DROP TABLE IF EXISTS `th_notice`;
CREATE TABLE `th_notice`  (
  `notice_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '通知序号',
  `course_id` int(0) NOT NULL COMMENT '课程号',
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `hits` int(0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`notice_id`) USING BTREE,
  INDEX `noticeforcourse`(`course_id`) USING BTREE,
  CONSTRAINT `noticeforcourse` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_notice
-- ----------------------------
INSERT INTO `th_notice` VALUES (1, 23, '计算机组成原理作业发布', '各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n各班长：\r\n    为满足疫情防控形势下的教学运行与管理需求，现面向学生开通“学生成绩单”打印功能。学生登录“教学管理信息服务平台”，点击“信息查询-学生成绩总表打印”即可查询或打印个人成绩单，成绩单制表人显示“学生学号”。\r\n  请周知！\r\n<i>hh</i>', 67, '2023-07-12 21:58:38');
INSERT INTO `th_notice` VALUES (2, 2, '总线部分学习任务', '<p style=\"margin-left:40px\"><span style=\"font-size:20px\">请大家把今天学习的总线知识好好整理，做好笔记，及时复习，加油！</span></p>\n', 41, '2023-07-11 21:42:46');
INSERT INTO `th_notice` VALUES (3, 3, '微机原理与汇编作业发布', '<p>第三章的实验作业已上传课堂</p>\n', 12, '2022-05-10 14:21:11');
INSERT INTO `th_notice` VALUES (4, 4, '课程设计', '<p>请大家结合本学期学习的课程，利用单片机的相关知识，设计一个小型定时器，要求：</p>\n\n<ul>\n	<li>能够显示时间和日期</li>\n	<li>能够设置闹钟</li>\n	<li>秒表功能</li>\n	<li>计时器功能</li>\n</ul>\n', 52, '2022-05-10 14:22:56');
INSERT INTO `th_notice` VALUES (5, 5, '计算体系课堂小结', '本次课堂我们学习了计算体系的相关知识，请大家务必要在课下多多练习，及时复习，加油！', 23, '2023-05-24 20:19:17');
INSERT INTO `th_notice` VALUES (6, 9, '大学物理实验通知', '大学物理：本周的实验报告没有交的同学抓紧时间了', 28, '2022-04-05 09:10:03');
INSERT INTO `th_notice` VALUES (8, 8, '数据结构实验通知', '数据结构：本周的实验报告没有交的同学抓紧时间了', 55, '2022-04-05 18:09:52');
INSERT INTO `th_notice` VALUES (13, 13, '大型硬件实验期末考试', '大型硬件实验：期末考试时间初步定在本周末，请大家注意复习', 23, '2022-04-12 18:09:52');
INSERT INTO `th_notice` VALUES (14, 14, '通信原理课堂小测', '通信原理：课堂小测结果已发布，请大家注意查看', 124, '2022-05-05 10:57:09');
INSERT INTO `th_notice` VALUES (15, 15, '高等数学课堂小测', '高等数学：课堂小测结果已发布，请大家注意查看', 3, '2022-04-13 11:09:33');
INSERT INTO `th_notice` VALUES (16, 16, '电工技术期末考试', '电工技术：期末考试时间初步定在本周末，请大家注意复习', 78, '2022-04-15 08:24:52');
INSERT INTO `th_notice` VALUES (17, 17, '电路实验作业发布', '电路实验：第三章的实验作业已上传课堂', 95, '2022-04-18 18:09:52');
INSERT INTO `th_notice` VALUES (43, 1, '萌新指南', '<h1 style=\"text-align:center\"><span style=\"font-size:26px\">首次登录请先完善您的个人信息&nbsp; *n_n*</span></h1>\n\n<p><span style=\"font-size:20px\">欢迎来到繁星之辰用户主页，在这里您可以：</span></p>\n\n<p><strong><span style=\"font-size:20px\">一、添加喜欢的课程</span></strong></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击&ldquo;添加课程&rdquo;选择想加入的课程，只能加入公开和开放的课程哦。</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">什么是公开和开放呢：</span></p>\n\n<ul>\n	<li><span style=\"font-size:20px\">公开的课程大家可以直接加入学习，使用课程中全部的资料和数据。</span></li>\n	<li><span style=\"font-size:20px\">开放是指课程刚被创建，审核通过且内容合格的课程。</span></li>\n	<li><span style=\"font-size:20px\">所以私有和关闭的课程是无法正常加入的哦。</span></li>\n</ul>\n\n<p><strong><span style=\"font-size:20px\">二、创建自己的课程</span></strong></p>\n\n<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;在&ldquo;我的课程&rdquo;选项卡中点击创建课程，我们给您的课程提供了默认封面，您也可以选择自己上传，推荐上传体积小于1M、尺寸比例1:1.8左右的封面哦。</span></p>\n\n<p><strong><span style=\"font-size:20px\">三、查看课程通知</span></strong></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">顶部轮播图区域会默认展示您所加入课程的最新通知，至多展示8条，更多通知请点击顶部消息中心查看。</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击轮播图，可以查看通知详情，或者在轮播图区域滚动，也可以直接查看通知。</span></p>\n\n<p><span style=\"font-size:20px\"><strong>四、修改个人信息</strong></span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击顶部头像，可以在修改个人信息窗口中编辑您的姓名，联系方式，密保等内容，或者更换您的头像。</span></p>\n', 543, '2023-07-11 21:45:52');
INSERT INTO `th_notice` VALUES (47, 1, '学生指南', '<p><span style=\"font-size:20px\">作为学生，您可以：</span></p>\n\n<p><strong><span style=\"font-size:20px\">一、加入课程学习</span></strong></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击添加课程，查找想要学习的课程，加入后即可开始学习。</span></p>\n\n<p><span style=\"font-size:20px\">&nbsp;<strong>二、在课程中您可以</strong></span></p>\n\n<ul>\n	<li><span style=\"font-size:20px\">查看课程视频，给视频点赞、评论</span></li>\n	<li><span style=\"font-size:20px\">查看课程通知</span></li>\n	<li><span style=\"font-size:20px\">下载老师上传的资料</span></li>\n	<li><span style=\"font-size:20px\">参与课程讨论，自己发布讨论</span></li>\n	<li><span style=\"font-size:20px\">查看实验并上传报告</span></li>\n	<li><span style=\"font-size:20px\">参与考试，答题并查看成绩</span></li>\n</ul>\n\n<p><strong><span style=\"font-size:20px\">三、退出课程</span></strong></p>\n\n<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;点击课程选项卡的右下角的退出课程，来离开课程。</span></p>\n', 5, '2023-07-11 22:27:01');
INSERT INTO `th_notice` VALUES (48, 2, '组成第一周测试发布', '<p style=\"margin-left:40px\"><span style=\"font-size:20px\">本周的组成原理测试已经发布，请大家及时查看！</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">本次测试内容包括：</span></p>\n\n<ul>\n	<li style=\"margin-left: 80px;\"><span style=\"font-size:20px\">​​一、计算机系统概述​​</span></li>\n	<li style=\"margin-left: 80px;\"><span style=\"font-size:20px\">​​二、计算机系统的组成​​</span></li>\n	<li style=\"margin-left: 80px;\"><span style=\"font-size:20px\">​​三、计算机硬件的性能指标​​</span></li>\n	<li style=\"margin-left: 80px;\"><span style=\"font-size:20px\">​​四、计算机的发展​​</span></li>\n</ul>\n', 2, '2023-05-23 14:33:05');
INSERT INTO `th_notice` VALUES (53, 1, '教师指南', '<p><span style=\"font-size:20px\">作为教师，您可以：</span></p>\n\n<p><strong><span style=\"font-size:20px\">一、发布课程</span></strong></p>\n\n<div><span style=\"font-size:20px\">在我的课程选项卡中，点击创建课程，为课程设置封面和简介后，就可以创建课程啦。</span></div>\n\n<div><span style=\"font-size:20px\">新课程创建后，默认为公开权限，即所有用户都可加入。您可以点击课程封面进入后台，在侧边栏中点击课程封面，进入课程简介和封面修改页面，点击滑块来变更权限。注意，新创建的课程需等待管理员审核，故课程会显示关闭标签。待审核通过后，该课程就会被展示在系统首页啦！</span></div>\n\n<p><span style=\"font-size:20px\">&nbsp;<strong>二、在课程中，您可以</strong></span></p>\n\n<ul>\n	<li><span style=\"font-size:20px\">上传章节视频，编辑，删除视频，参加视频下的评论，删除不恰当的评论</span></li>\n	<li><span style=\"font-size:20px\">发布，编辑，删除课程内的通知</span></li>\n	<li><span style=\"font-size:20px\">上传，下载，批量管理课程内的课件</span></li>\n	<li><span style=\"font-size:20px\">发布课程讨论，参与讨论并能删除不恰当的回复</span></li>\n	<li><span style=\"font-size:20px\">发布实验并上传任务书，下载学生提交的实验报告</span></li>\n	<li><span style=\"font-size:20px\">发布考试并编辑题目，修改考试时间，阅卷并查看学生成绩</span></li>\n</ul>\n\n<p><strong><span style=\"font-size:20px\">三、管理课程人员</span></strong></p>\n\n<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;在课程管理中，您可以查看所有课程内学生的学习记录，并能够下载记录到本地，同时也可以删除违反规定的用户。</span></p>\n\n<p>&nbsp;</p>\n', 2, '2023-08-11 16:06:46');
INSERT INTO `th_notice` VALUES (54, 7, '短文本测试', '<p>这里是测试文本</p>\n\n<p>测试员：Jczone</p>\n\n<p>测试结果：success</p>\n\n<p>测试时间：20230711</p>\n', 0, '2023-07-11 21:35:55');
INSERT INTO `th_notice` VALUES (55, 7, '长文本测试', '<p>朋友你好，由于项目开发时间较早，受当时开发者能力的限制（菜），里面存在一些bug和可优化部分没有处理（会处理的，最近在找工作..），以下是测试中发现的一些问题，提供给你参考：</p>\n\n<h3>1. 用户主页（UserMainPage）</h3>\n\n<ul>\n	<li>\n	<p><strong>缺少分页</strong>：加入课程以及课程卡片展示区域，都没有做分页查询，如果系统中课程数量很多，</p>\n	</li>\n</ul>\n\n<h3>1. 章节页面（ChapterTab/StuChapterTab）</h3>\n\n<ul>\n	<li>\n	<p><strong>数字遮挡</strong>：小卡片上浏览量和播放量没有做分级，采用固定布局时，数字太长会被图标遮挡；</p>\n	</li>\n	<li>\n	<p><strong>章节删除失败</strong>：章节封面使用video组件展示，虽然禁用了播放等操作，但只要位于该页面，服务器文件将一直处于open状态，导致用户删除视频时，文件删除操作失败（数据库可以成功删除），形成无法索引到的&ldquo;死数据&rdquo;；</p>\n	</li>\n</ul>\n\n<h3>2. 视频播放页面（ChapterView/StuChapterView）</h3>\n\n<ul>\n	<li>\n	<p><strong>刷播放量</strong>：当前策略为用户进入播放页面5秒后，该视频增加1点播放量。实际上这个时间太短，采用百分比时长更合适，但这需要读取到视频时长；</p>\n	</li>\n</ul>\n\n<h3>3. 关于代码</h3>\n\n<p>项目中有些代码，书写不一定规范，甚至有些看起来很蠢，已知的一些问题如下，恳请包容~</p>\n\n<ul>\n	<li>\n	<p><strong>数据泄露</strong>：数据传递时没有封装专门的DTO，而是直接使用POJO，导致关键信息被泄露；</p>\n	</li>\n	<li>\n	<p><strong>冗余查询</strong>：数据存入数据库后，没有直接用返回的ID，而是通过数据内容查询新插入的记录，从而获取ID，这在考试部分较为常见；</p>\n	</li>\n	<li>\n	<p><strong>冗余条件</strong>：部分数据更新没有采用UpdateWrapper，而是使用了service.update(pojo,queryWrapper)方法完成，不够简洁。实际上可以采用updateById或者UpdateWrapper来封装更新条件。</p>\n	</li>\n</ul>\n\n<h3>4. 关于时间</h3>\n\n<ul>\n	<li>\n	<p><strong>过度显示</strong>：系统中的时间有些地方是全显示，即具体到时分秒，有些地方则只显示到日期，这在某些地方可能并不合理，比如评论区中的评论，没有必要展示到秒等等；</p>\n	</li>\n	<li>\n	<p><strong>时区错误</strong>：另一个关于时间的问题，是数据库中的时区和前端显示的时区不匹配，这不影响前端，但在数据库中查看数据，会发现时间比真实时间少8个小时；</p>\n	</li>\n</ul>\n', 3, '2023-07-12 21:53:40');
INSERT INTO `th_notice` VALUES (56, 7, '图片通知测试', '<p><img alt=\"\" height=\"360\" src=\"/files/user/stu023/ckeditor/ckeditor_2023_07_11213720647.jpg\" width=\"644\" /></p>\n', 2, '2023-07-12 21:58:44');
INSERT INTO `th_notice` VALUES (57, 7, '表格和格式测试', '<h3>Dos命令</h3>\n\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\n	<tbody>\n		<tr>\n			<th>功能</th>\n			<th>指令</th>\n			<th>示例</th>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">查看当前目录</td>\n			<td style=\"text-align:center\">dir</td>\n			<td style=\"text-align:center\">dir d:\\com\\main</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">切换到其他盘</td>\n			<td style=\"text-align:center\">cd /D</td>\n			<td style=\"text-align:center\">cd /D c:</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">切换到当前盘其他目录</td>\n			<td style=\"text-align:center\">cd</td>\n			<td style=\"text-align:center\">（绝对路径）cd d:\\com\\main</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">切换到当前盘其他目录</td>\n			<td style=\"text-align:center\">cd</td>\n			<td style=\"text-align:center\">（相对路径）cd ..\\com\\main</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">切换到上一级</td>\n			<td style=\"text-align:center\">cd ..</td>\n			<td style=\"text-align:center\">&nbsp;</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">切换到根目录</td>\n			<td style=\"text-align:center\">cd \\</td>\n			<td style=\"text-align:center\">&nbsp;</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">查看指定目录下子级目录（树）</td>\n			<td style=\"text-align:center\">tree</td>\n			<td style=\"text-align:center\">tree d:\\com\\main</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">清屏</td>\n			<td style=\"text-align:center\">cls</td>\n			<td style=\"text-align:center\">cls</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">退出</td>\n			<td style=\"text-align:center\">exit</td>\n			<td style=\"text-align:center\">exit</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">创建目录</td>\n			<td style=\"text-align:center\">md</td>\n			<td style=\"text-align:center\">md 目录名</td>\n		</tr>\n		<tr>\n			<td style=\"text-align:center\">删除目录（目录必须为空）</td>\n			<td style=\"text-align:center\">rd</td>\n			<td style=\"text-align:center\">rd 目录名</td>\n		</tr>\n	</tbody>\n</table>\n\n<p>相对路径：从当前目录开始定位形成的路径</p>\n\n<p>绝对路径：从顶级目录开始定位形成的路径</p>\n\n<p>help：查看当前指令的帮助信息（如：help cd）</p>\n', 2, '2023-07-12 21:58:42');

-- ----------------------------
-- Table structure for th_notice_adm
-- ----------------------------
DROP TABLE IF EXISTS `th_notice_adm`;
CREATE TABLE `th_notice_adm`  (
  `notice_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '通知序号',
  `admin_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '管理员账号',
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `hits` int(0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`) USING BTREE,
  INDEX `pcreator_id`(`admin_id`) USING BTREE,
  CONSTRAINT `th_notice_adm_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `th_admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_notice_adm
-- ----------------------------
INSERT INTO `th_notice_adm` VALUES (1, 'root', '期末考试通知', '<ul style=\"margin-left:40px\">\n	<li><span style=\"font-size:20px\">课程名称：毛泽东思想和中国特色社会主义理论体系概论（2018年版） </span></li>\n	<li><span style=\"font-size:20px\">考试名称：2021-22学年（第二学期）期末考试 </span></li>\n	<li><span style=\"font-size:20px\">考试时间：06-21 08:33 至 06-21 11:05 </span></li>\n	<li><span style=\"font-size:20px\">考试时长：150分钟 考试形式：自主考试</span></li>\n</ul>\n', 198, '2022-04-06 16:46:06');
INSERT INTO `th_notice_adm` VALUES (2, 'root', '实践作业通知', '<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;实践作业是期末成绩的一个重要组成部分，本学期实践作业已发布。自定题目写一篇关于抗疫的论文，如抗疫的经验和启示、从抗疫看中国制度优势、抗疫中的&ldquo;最美逆行者&rdquo;、抗疫体现中国精神等等。要求：手写在信纸或A4纸上，3000字，两周内完成，从学习通提交。（注意提交的截止时间6月20日晚上十一点）</span></p>\n', 57, '2022-04-06 16:46:31');
INSERT INTO `th_notice_adm` VALUES (3, 'root', '《离散数学》课程介绍', '<p>离散数学是计算机学科的经典核心基础课程。</p>\n\n<p>课程内容主要包括集合论，数理逻辑，关系理论，图论相关内容，为进一步学习计算机科学的基本理论和方法以及之后的专业课打下良好的基础。通过这门课程的学习，将会培养学生的抽象思维能力，逻辑推理能力，缜密概括能力以及分析和解决实际问题的能力。</p>\n\n<p>离散数学的学习，为其后续课程（如数据结构、操作系统、计算机网络、编译理论、数字逻辑理论、数据库系统、算法分析、系统结构、人工智能等）的学习打下坚实的理论基础。 这门课程的理论性较强，知识点比较多，但均&ldquo;有迹可循，有法可依&rdquo;，因而完成这门课程的学习并非很难。我们通过对课程内容的合理安排（&ldquo;营养均衡&rdquo;），每一讲的精心调配（&ldquo;正餐&rdquo;），课后习题的专业配套（&ldquo;甜点&rdquo;），为在线学习用户提供了学习离散数学课程的一种新形式。</p>\n', 34, '2022-04-06 16:46:58');
INSERT INTO `th_notice_adm` VALUES (5, 'root', '成绩单打印通知', '<ul>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！ </span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n	<li><span style=\"font-family:SimSun\"><span style=\"font-size:20px\">各班长： 为满足疫情防控形势下的教学运行与管理需求，现面向学生开通&ldquo;学生成绩单&rdquo;打印功能。学生登录&ldquo;教学管理信息服务平台&rdquo;，点击&ldquo;信息查询-学生成绩总表打印&rdquo;即可查询或打印个人成绩单，成绩单制表人显示&ldquo;学生学号&rdquo;。 请周知！</span></span></li>\n</ul>\n', 12, '2022-04-09 14:27:27');
INSERT INTO `th_notice_adm` VALUES (6, 'root', '人才构成通知', '<p style=\"margin-left:40px\">学院聚焦落实&ldquo;人才优先&rdquo;发展方针，统筹&ldquo;三支人才队伍&rdquo;建设，不断深化人才体制机制改革创新，全面激发人才活力和创造力。在不断地改革创新中，坚持服务战略、统筹兼顾，多措并举，全面培养和加快人才梯队建设，加大人才引进，以实现人才优化配置，培养造就了一支具有国际水平的专业人才队伍。 　　</p>\n\n<p style=\"margin-left:40px\">截至2022年，学院教职工总数近1000人，平均年龄36.5岁，硕士及以上学历人员接近总数的三分之二，专业技术人员超过职工总数的一半。拥有多名研究生导师、中核集团青年人才、中国同辐技术带头人及培养对象。</p>\n', 5, '2022-04-09 14:27:30');
INSERT INTO `th_notice_adm` VALUES (7, 'root', '《数据结构与算法》', '<p>教学目标（需明确各教学环节对人才培养目标的贡献）</p>\n\n<p>知识贡献：</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp;掌握线性表、栈、队列、二叉树、树、图等基本数据结构的概念；掌握各类数据结构中元素的增加、修改、删除、查找等基本操作的算法流程；掌握二叉树、二叉检索树、高度平衡二叉树、堆、树等非线性数据结构的基本性质；掌握顺序查找、二分查找两种常见的线性表检索方法；掌握插入排序、选择排序、冒泡排序、快速排序、归并排序、堆排序等常见的排序方法；理解文件管理的概念，掌握常见的外排序算法；掌握图的基本概念、图的存储方法和实现方法，理解图的遍历、最短路径、最小生成树等方面的常用算法。 能力贡献：通过学习数据结构与算法的基本概念和基本原理，增强学生对抽象数据类型的理解能力；通过用C++编程语言实现数据结构和算法，增强学生的程序设计能力；掌握基本的算法分析技术，增强对算法流程和程序实现的分析能力；通过分析数据结构与算法的应用案例、上机练习以及数据结构与算法应用设计，培养学生利用所学知识解决具体问题的能力和创新能力。 素质贡献：在理论学习、编程实现、算法应用等各个环节中，养成认真、踏实、细心的良好习惯，提升专业素养。</p>\n', 7, '2022-04-09 14:27:32');
INSERT INTO `th_notice_adm` VALUES (8, 'root', '人员构成通知', '<p style=\"text-align:center\"><span style=\"color:#000000\"><span style=\"font-size:24px\"><span style=\"background-color:#ecf0f1\">首次登录请先完善您的个人信息&nbsp; *n_n*</span></span></span></p>\n\n<p><span style=\"font-size:20px\">您可以：</span></p>\n\n<p><span style=\"font-size:20px\">一、添加喜欢的课程</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击&ldquo;添加课程&rdquo;选择想加入的课程，只能加入公开和开放的课程哦。</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">什么是公开和开放呢：</span></p>\n\n<ul>\n	<li><span style=\"font-size:20px\">公开的课程大家可以直接加入学习，使用课程中全部的资料和数据。</span></li>\n	<li><span style=\"font-size:20px\">开放是指课程刚被创建，审核通过且内容合格的课程。</span></li>\n	<li><span style=\"font-size:20px\">所以私有和关闭的课程是无法正常加入的哦。</span></li>\n</ul>\n\n<p><span style=\"font-size:20px\">二、创建自己的课程</span></p>\n\n<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;在&ldquo;我的课程&rdquo;选项卡中点击创建课程，我们给您的课程提供了默认封面，您也可以选择自己上传，推荐上传体积小于1M、尺寸比例1:1.8左右的封面哦。</span></p>\n<p style=\"text-align:center\"><span style=\"color:#000000\"><span style=\"font-size:24px\"><span style=\"background-color:#ecf0f1\">首次登录请先完善您的个人信息&nbsp; *n_n*</span></span></span></p>\n\n<p><span style=\"font-size:20px\">您可以：</span></p>\n\n<p><span style=\"font-size:20px\">一、添加喜欢的课程</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击&ldquo;添加课程&rdquo;选择想加入的课程，只能加入公开和开放的课程哦。</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">什么是公开和开放呢：</span></p>\n\n<ul>\n	<li><span style=\"font-size:20px\">公开的课程大家可以直接加入学习，使用课程中全部的资料和数据。</span></li>\n	<li><span style=\"font-size:20px\">开放是指课程刚被创建，审核通过且内容合格的课程。</span></li>\n	<li><span style=\"font-size:20px\">所以私有和关闭的课程是无法正常加入的哦。</span></li>\n</ul>\n\n<p><span style=\"font-size:20px\">二、创建自己的课程</span></p>\n\n<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;在&ldquo;我的课程&rdquo;选项卡中点击创建课程，我们给您的课程提供了默认封面，您也可以选择自己上传，推荐上传体积小于1M、尺寸比例1:1.8左右的封面哦。</span></p>\n<p style=\"text-align:center\"><span style=\"color:#000000\"><span style=\"font-size:24px\"><span style=\"background-color:#ecf0f1\">首次登录请先完善您的个人信息&nbsp; *n_n*</span></span></span></p>\n\n<p><span style=\"font-size:20px\">您可以：</span></p>\n\n<p><span style=\"font-size:20px\">一、添加喜欢的课程</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">点击&ldquo;添加课程&rdquo;选择想加入的课程，只能加入公开和开放的课程哦。</span></p>\n\n<p style=\"margin-left:40px\"><span style=\"font-size:20px\">什么是公开和开放呢：</span></p>\n\n<ul>\n	<li><span style=\"font-size:20px\">公开的课程大家可以直接加入学习，使用课程中全部的资料和数据。</span></li>\n	<li><span style=\"font-size:20px\">开放是指课程刚被创建，审核通过且内容合格的课程。</span></li>\n	<li><span style=\"font-size:20px\">所以私有和关闭的课程是无法正常加入的哦。</span></li>\n</ul>\n\n<p><span style=\"font-size:20px\">二、创建自己的课程</span></p>\n\n<p><span style=\"font-size:20px\">&nbsp; &nbsp; &nbsp; &nbsp;在&ldquo;我的课程&rdquo;选项卡中点击创建课程，我们给您的课程提供了默认封面，您也可以选择自己上传，推荐上传体积小于1M、尺寸比例1:1.8左右的封面哦。</span></p>\n', 223, '2022-04-09 14:27:34');
INSERT INTO `th_notice_adm` VALUES (9, 'root', '关于本学期通识基础选修实体课的选课结课及开课通知', '<p>各学院、各位同学：</p>\n\n<p>&nbsp; &nbsp; &nbsp; 本学期通识基础选修实体课的选课阶段已结束，共16个课堂的选课人数大于20人，可以正常开课。除此之外的其他课堂停开，已选停开课堂的同学可以继续选网络课。</p>\n', 21, '2022-04-14 00:40:06');
INSERT INTO `th_notice_adm` VALUES (10, 'root', '关于2021-2022学年春季学期通识基础选修课的选课通知', '<p>各学院、各位同学：</p>\n\n<p>&nbsp;2021-2022学年春季学期通识基础选修课开始在网上进行选课，请同学们仔细阅读并严格遵守，在规定时间内进行选课和学习。各学院要鼓励学生积极选修《中国共产党历史》课程，推动学生学史明理、学史增信、学史崇德、学史力行。</p>\n\n<p>一、选修课类型 通识基础选修课包括校内实体课和网络平台课两部分课程，根据培养计划规定，学生在校期间要修满8学分的通识基础选修课，相同课程不重复计算学分。建议学生每学期根据课业负重情况选课。</p>\n\n<p>二、选课对象 选课对象为2021级、2020级、2019级、2018级以及2017级（五年制专业）。 2021级、2020级学生同一类别选课不超过2学分（中华传统、世界文明、当代社会、文艺审美、生命探索、科技创新六类素质教育课程）。</p>\n', 24, '2022-04-07 00:40:09');
INSERT INTO `th_notice_adm` VALUES (12, 'root', '关于2022-2023学年秋季学期专业选修课补选的通知', '<p>各相关学院：</p>\n\n<p>因2022-2023学年秋季学期专业选修课部分课堂选课人数未达规定人数，相关课程已停开，停开课程清单详见附件。</p>\n\n<p>专业选修课补选工作安排在2022年7月27日17时&mdash;7月28日17时进行，在之前选课阶段漏选、错选的学生以及选择了上述停开课程的可以继续在剩余开设课程中选课，请材料、电气、信计、土木、环工、文法、外语、体育、国教、物电、艺术、生医学院通知相关学生及时选课，确保在规定时间内完成补选任务。</p>\n\n<p>教务处</p>\n', 77, '2022-04-15 00:40:15');
INSERT INTO `th_notice_adm` VALUES (13, 'root', '《沟通与交流》 通知', '<p>一、基本信息（必填项）</p>\n\n<p>课程代码：【2030230】</p>\n\n<p>课程学分：【2】</p>\n\n<p>面向专业：【19级秘书专业】</p>\n\n<p>课程性质：专业必修课</p>\n\n<p>开课院系：新闻传播学院 使用教材：贾朝莉，罗春芳，《管理沟通》 湖南师范大学出版社 2017年5月</p>\n\n<p>参考教材：</p>\n\n<p>1、惠亚爱，沟通技巧，人民邮电出版社，2008年03月</p>\n\n<p>2、 徐宪光，《商务沟通》，外语教学与研究出版社，2001</p>\n\n<p>3、 （美）黑贝尔斯，威沃尔；李业昆 译，《有效沟通》，华夏出版社，2001.11 4、 王磊，《管理沟通》，石油工业出版社，2001.1</p>\n\n<p>二、课程简介</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; 现代社会，人们之间的交际广度和频率度不断加大，人际沟通能力成为人们生活和工作的重要手段，社交的礼仪形象能有效地展现一个人的素养、学识、风度和魅力。《沟通与交流》即是一门训练学生口语交际能力和礼仪基础的课程，旨在能过本课程的教学和训练，使学生掌握口语交际的基本技巧和社交礼仪的基本知识，以适应未来工作、学习和生活的需要，并为人际沟通能力和社交礼仪的进一步提高奠定良好的基础。 教学活动主要通过课堂讲授、音像教学、情景演示等形式进行，注重学生职业素质和沟通能力的培养。</p>\n\n<p>三、选课建议</p>\n\n<p>&nbsp; &nbsp; &nbsp; 该课程适合传播专业、新闻专业、广告专业或秘书专业二、三年级学生学习。</p>\n', 55, '2022-03-30 00:40:18');
INSERT INTO `th_notice_adm` VALUES (15, 'admin', '形势与政策专题教学大纲', '<p>一、课程的性质、目的和任务</p>\n\n<p>1、课程性质：本课程属于公共思想政治必修课。</p>\n\n<p>2、课程目的：通过本课程的教学，使学生了解国内外的重大时事，全面认识和正确理解党的基本路线、重大方针和政策，认清形势和任务，掌握时代的脉搏，激发爱国主义精神，增强民主自信心和社会责任感，珍惜和维护国家稳定的大局，为建设有中国特色的社会主义而奋发学习、健康成长。</p>\n\n<p>3、课程任务：紧密结合国内外形势，紧密结合学生的思想实际，通过适时地进行形势政策、世界政治经济与国际关系基本知识的教育，帮助学生开阔视野，及时了解和正确对待国内外重大时事，使学生在改革开放的环境下有坚定的立场、有较强的分析能力和适应能力。</p>\n\n<p>二、课程教学的基本要求</p>\n\n<p>坚持以习近平新时代中国特色社会主义思想为指导，针对学生关注的热点问题和思想特点，帮助学生认清国内外形势，教育和引导学生全面准确地理解党的路线、方针和政策，坚定在中国共产党领导下走建设有中国特色社会主义道路的信心和决心，积极投身改革开放和中华民族伟大复兴的事业中来。</p>\n\n<p>&nbsp;</p>\n', 46, '2022-04-17 00:40:24');
INSERT INTO `th_notice_adm` VALUES (16, 'root', '《马克思主义基本原理概论》课程教学大纲', '<p>总 学 时：54</p>\n\n<p>学 分：3（其中理论教学2学分，实践教学1学分）</p>\n\n<p>适用专业：全校各本科专业</p>\n\n<p>先修课程：思想道德修养与法律基础；中国近现代史纲要</p>\n\n<p>一、课程的目的与任务 《马克思主义基本原理概论》是高校思想政治理论课程体系的主干课程，其内容包括：马克思主义哲学、政治经济学和科学社会主义三个组成部分。本课程的目的是对学生进行系统的马克思主义理论教育，帮助学生掌握马克思主义的世界观和方法论，树立马克思主义的人生观和价值观，学会用马克思主义的世界观和方法论观察和分析问题，培养和提高学生运用马克思主义理论分析和解决实际问题的能力。为学生确立建设有中国特色社会主义的理想信念，自觉地坚持党的基本理论、基本路线和基本纲领打下扎实的理论基础。</p>\n\n<p>二、课程的基本要求 《马克思主义哲学原理概论》是从整体上来介绍马克思主义基本理论的课程。通过本课程的学习，要使大学生完整地把握马克思主义的基本理论，使学生认识到马克思主义是科学的世界观和方法论，是我们从事社会主义革命和社会主义建设指导思想和理论基础。要求学生掌握和了解马克思主义哲学、马克思主义政治经济学以及科学社会主义的基本理论，在实践中学会运用马克思主义的基本原理认识和分析各种社会实际问题，正确认识人类社会的本质、社会发展动力和社会发展基本规律，正确认识资本主义和社会主义在其发展过程中出现的各种新情况、新问题，认识社会主义代替资本主义的历史必然性，从而坚定对社会主义和共产主义的信念。</p>\n\n<p>三、与其他课程的联系和分工 《马克思主义基本原理概论》与《近现代史纲要》、《毛泽东思想和中国特色社会主义理论体系概论》、《思想道德修养与法律基础》等几门课程一起构成马克思主义政治理论课。这些课程的共同任务是对青年学生进行马克思主义基本原理和基本理论的教育，帮助学生树立正确的世界观和人生观，坚定对社会主义和共产主义的信念。《马克思主义基本原理概论》在这些课程中起着理论基础的作用，为学生正确学习和理解其他政治理论课提供科学的世界观和方法论。</p>\n', 39, '2022-04-05 00:40:27');
INSERT INTO `th_notice_adm` VALUES (18, 'root', '《思想道德修养与法律基础》课程教学大纲', '<p>一、课程基本情况</p>\n\n<p>1.课程编号：my0100101</p>\n\n<p>2.课程中文名称：思想道德修养与法律基础 课程英文名称：CultivationofEthicsandFundamentalsofLaw</p>\n\n<p>3.课程总学时：54</p>\n\n<p>4.课程学分：3</p>\n\n<p>5.课程类型：公共必修课 6.开课单位：马克思主义学院基础教研室</p>\n\n<p>7.适用专业：所有本、专科专业 8.必修课程：无</p>\n\n<p>9.课程负责人：王茝</p>\n\n<p>二、教学目的和要求</p>\n\n<p>1.课程说明： 《思想道德修养与法律基础》是大学生的公共基础必修课程，其教学对象是高等院校的全体本、专科学生，是帮助大学生树立正确的世界观、人生观、价值观、道德观和法制观的重要课程。</p>\n\n<p>2.教学目的： 《思想道德修养与法律基础》是帮助大学生明是非、知荣辱、辨美丑，启迪大家求真、向善、爱美的课程；是帮助大学生正确处理理想与现实、个人与集体、竞争与合作、权利与义务、自由与纪律、友谊与爱情、学习与工作等关系，树立正确的世界观、人生观、价值观、道德观和法制观的课程；是引导大学生不断提高自我修养，促进自身德智体美劳全面发展课程。</p>\n\n<p>3.教学要求：</p>\n\n<p style=\"margin-left:40px\">（1）该课程要以社会主义核心价值观教育和社会主义法治观教育为主线，以爱国主义、社会主义、集体主义教育为核心来展开课堂教学。</p>\n\n<p style=\"margin-left:40px\">（2）教学要达到科学性、思想性、创新性、针对性和实践性的统一。</p>\n\n<p style=\"margin-left:40px\">（3）教学方式可灵活多样。如：理论教学、案例教学、课堂互动、多媒体教学和第二课堂的实践教学等。</p>\n\n<p style=\"margin-left:40px\">（4）学习成绩评定应注重科学性、合理性。注意把学生的学习态度、平时成绩、卷面成绩、实践成绩等方面结合起来。</p>\n', 12, '2022-04-06 11:40:43');
INSERT INTO `th_notice_adm` VALUES (19, 'root', '《数据结构》', '<p>课程名称：数据结构&nbsp; &nbsp; 课程编码：7085431&nbsp; &nbsp; 课程学分：3学分</p>\n\n<p>课程学时：48学时&nbsp; &nbsp; &nbsp; &nbsp;适用专业：计算机科学与技术</p>\n\n<p>先修课程：C程序设计，离散数学&nbsp; &nbsp;课程类别：专业必修课</p>\n\n<p>一、课程简介与目标</p>\n\n<p>本课程的授课对象为计算机科学与技术专业学生，课程属性为专业基础必修课。 该课程作为一门重要的专业基础课程，所讨论的知识内容和技术方法，无论对进一步 学习计算机专业的其他课程，还是对从事软件开发，都起着重要的作用，不仅为操作 系统、编译原理、数据库原理等后继课程提供必要的知识基础，同时也为从事软件开 发提供了必要的技能训练。 通过本课程的学习，使学生了解数据对象的特性，学会数据组织的方法，以及各种类型数据的处理方法，同时培养学生良好的程序设计技能。</p>\n\n<p>1.&nbsp; 课程支撑的毕业要求</p>\n\n<ul>\n	<li>能面向计算系统和过程，选择或建立适当的描述模型。</li>\n	<li>能运用基本原理，借助文献研究，分析过程的影响因素，获得有效结论。</li>\n	<li>能够针对计算机专业的一般性工程问题设计出计算机应用系统的方案，构 建系统框架，能够针对关键问题选择合理算法或方法。</li>\n</ul>\n\n<p>2.&nbsp; 课程拟达到的教学目标 本课程主要讨论计算机中非数值数据的处理问题，针对数据对象的特性、数据的组织方法和处理方法展开讨论，使学生的专业基本技能和综合运用能力得到提升。</p>\n\n<p>本课程具体教学目标为：</p>\n\n<p>目标 1：掌握数据结构的相关概念，理解计算机处理非数值数据问题的基本原理 和处理方法，掌握实际问题到不同数据类型数据的抽象过程和处理方法；</p>\n\n<p>目标 2：理解线性表、树、图各种数据类型的特性，掌握不同类型数据的基本存 储方法，以及各基本操作的实现算法，并能应用在实际系统设计中；</p>\n\n<p>目标 3：能够结合数学、离散数学等相关理论实现各种类型数据的操作，建立算 法效率评价意识，掌握算法评价方法，并能在解决实际问题中提出不同的解决方案， 分析优化得到相对较好的实现方法；</p>\n\n<p>目标 4：理解查找、排序基本方法在系统级的应用，能够综合所学知识解决系统 级问题；</p>\n\n<p>目标 5：较全面理解计算机处理数据的基本方法，能够运用数据分析、数据组织 存储、以及数据处理算法等方法，对实际问题进行分析和处理，并能得到有效结果。 课程思政目标：通过计算思维能力和基本工程素养的培养，培育学生精益求精的 工匠精神以及专业技术人员所具有社会责任感和职业道德。</p>\n', 112, '2022-04-14 07:40:50');
INSERT INTO `th_notice_adm` VALUES (20, 'root', '《计算机网络》', '<p><strong>【课程目的】</strong></p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp;本课程的教学目的是使学生掌握计算机网络的基础理论、基本原理、基本技术，掌握计算机网络的体系结构和典型网络协议，理解典型网络设备的工作原理，了解典型网络设备的组成和特点，能够运用计算机网络的基本概念、基本原理和基本方法进行网络系统的分析、设计和应用，为学习其他课程以及从事计算机网络的研究、开发、管理和使用打下坚实的基础。</p>\n\n<p><strong>【课程内容简介】</strong></p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp;《计算机网络》主要讲述网络运行原理、数据通讯模型和一些成熟的网络技术。着重介绍了数据通讯模型，网络的分层体系结构，主要的网络协议，局域网、广域网和网络互连的原理、技术和设备，各种网络服务的内部运行原理和应用，网络安全，网络发展方向和趋势等内容。全课程以讲述网络和通讯技术的基本原理、基本概念和基本技术为主。</p>\n\n<p><strong>【教学要求】</strong></p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp;网络技术日新月异，通过本课程的教学，使学生对计算机网络从整体上有一个较清晰的了解，了解计算机网络的基本概念，了解网络新技术的新发展，从网络层次结构模型的应用层到物理层来对计算机网络体系结构进行描述，掌握计算机网络各层协议的基本工作原理及其所采用的技术，对当前计算机网络的主要种类和常用的网络协议有较清晰的概念，学会计算机网络的一些基本设计方法。通过本课程，还要掌握网络技术的学习方法，为以后从事相关的应用和科研工作打下坚实的基础。 本课程总学时为54学时 ，其中课堂讲授44学时，实验（实践）10学时。</p>\n', 258, '2022-04-09 10:40:55');
INSERT INTO `th_notice_adm` VALUES (21, 'root', '《计算机组成原理 》', '<p>《计算机组成原理 》教学大纲 Principles of Computer Composition</p>\n\n<p style=\"margin-left:40px\">课程编码：12A03031 学分：3&nbsp; 课程类别：专业基础课</p>\n\n<p style=\"margin-left:40px\">计划学时：48 其中讲课：48 实验或实践：0</p>\n\n<p style=\"margin-left:40px\">上机：0 适用专业：计算机科学与技术（软件外包方向）</p>\n\n<p style=\"margin-left:40px\">推荐教材： 唐朔飞，《计算机组成原理（第2版）》，高等教育出版社，2008年</p>\n\n<p style=\"margin-left:40px\">参考书目： 1.白中英，《计算机组成原理（第4版）》，科学出版社，2008年 2.蒋本珊编著，《计算机组成原理》（第2版）》，清华大学出版社，2008年</p>\n\n<p>课程的教学目的与任务</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp;本课程的教学目的是通过理论学习使学生系统地掌握计算机的组成部分和内部运行机理，为学生进一步学习计算机专业的后续课程打下坚实的基础。课程的主要任务是使学生掌握组成计算机的基本部件即存储器、运算器、控制器、输入输出系统和连接它们之间的系统总线的构成、组织方式和工作原理，以及部件和单元的设计思想，并以控制流和数据流为主线，将计算机的各大部件联系起来，使学生建立计算机整机概念并主动探索计算机内部的庞杂架构及其如何自动工作的原理，为计算机专业知识体系的建立打下扎实的理论基础。</p>\n\n<p>课程的基本要求</p>\n\n<p>1、 通过课程的学习，应掌握计算机计算机系统的结构原理，掌握数据的表示、转换和运算机理；</p>\n\n<p>2、 掌握程序和数据在计算机中的存储原理；掌握计算机的指令系统；</p>\n\n<p>3、 掌握CPU工作原理，程序运行过程，掌握接口技术与原理和常见外部设备的基本结构与工作原理。 各章节授课内容、教学方法及学时分配建议</p>\n', 99, '2022-04-12 13:41:00');
INSERT INTO `th_notice_adm` VALUES (22, 'root', '系统公告测试', '<p>测试文案</p>\n', 0, '2022-05-05 03:48:23');
INSERT INTO `th_notice_adm` VALUES (24, 'admin', '2023通知测试', '<p>这里是通知内容</p>\n', 0, '2023-05-26 07:49:12');

-- ----------------------------
-- Table structure for th_paper
-- ----------------------------
DROP TABLE IF EXISTS `th_paper`;
CREATE TABLE `th_paper`  (
  `paper_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '试卷id',
  `exam_id` int(0) NULL DEFAULT NULL COMMENT '所属任务id',
  `subject_type` int(0) NULL DEFAULT NULL COMMENT '1-选择 2-填空 3-判断 4-简答',
  `subject_id` int(0) NULL DEFAULT NULL COMMENT '题目id',
  `subject_num` int(0) NULL DEFAULT NULL COMMENT '题目序号',
  PRIMARY KEY (`paper_id`) USING BTREE,
  INDEX `subject_id`(`subject_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE,
  CONSTRAINT `th_paper_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `th_exam` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_paper
-- ----------------------------
INSERT INTO `th_paper` VALUES (1, 1, 1, 1, 1);
INSERT INTO `th_paper` VALUES (2, 1, 1, 2, 2);
INSERT INTO `th_paper` VALUES (3, 1, 1, 3, 3);
INSERT INTO `th_paper` VALUES (4, 1, 2, 1, 6);
INSERT INTO `th_paper` VALUES (5, 1, 2, 2, 7);
INSERT INTO `th_paper` VALUES (6, 1, 2, 3, 8);
INSERT INTO `th_paper` VALUES (7, 1, 3, 1, 9);
INSERT INTO `th_paper` VALUES (8, 1, 3, 2, 10);
INSERT INTO `th_paper` VALUES (9, 1, 3, 3, 11);
INSERT INTO `th_paper` VALUES (10, 1, 4, 1, 12);
INSERT INTO `th_paper` VALUES (11, 1, 4, 2, 13);
INSERT INTO `th_paper` VALUES (12, 1, 4, 3, 14);
INSERT INTO `th_paper` VALUES (17, 1, 1, 6, 5);
INSERT INTO `th_paper` VALUES (20, 2, 3, 5, 1);
INSERT INTO `th_paper` VALUES (21, 1, 1, 8, 4);
INSERT INTO `th_paper` VALUES (22, 1, 2, 6, 15);

-- ----------------------------
-- Table structure for th_question_answer
-- ----------------------------
DROP TABLE IF EXISTS `th_question_answer`;
CREATE TABLE `th_question_answer`  (
  `subject_id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '题目',
  `answer` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案',
  `analysis` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '解析',
  `score` int(0) NULL DEFAULT NULL COMMENT '分值',
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_question_answer
-- ----------------------------
INSERT INTO `th_question_answer` VALUES (1, '试说明循环冗余校验码的校验原理', '循环冗余校验码的生成步骤：①确定校验位的位数 r\n\n                                                      ②写出信息多项式 M(x)\n\n                                                      ③将信息多项式左移 r 位，得到 M(x)·x^r\n\n                                                      ④用 M(x)·x^r 除以生成多项式 G(x)，得到 r 位校验位\n\n                                                      ⑤M(x)·x^r+R(x) 得到CRC码\n\n     检验原理：根据余数判出错位，取反纠错。', '无解析', 12);
INSERT INTO `th_question_answer` VALUES (2, '在写操作时，要考虑Cache和主存的数据一致性的问题，试说明写回法和写直达法的区别', ' 写回法（拷回法）：写操作时只把数据写入Cache而不写入主存（减少了主存的写操作次数），写操作时间=访Cache时间。但当（读操作且Cache已满时）Cache数据被替换出来时才写回主存，增加了Cache复杂性。\n\n     写直达法（存直达法）：写操作时数据既写入Cache又写入主存，写操作时间=访存时间，它能随时保证主存与Cache的数据始终一致，但增加了访存次数。（读操作时不涉及对主存的写操作，更新策划较容易实现。）\r\n', '无解析', 12);
INSERT INTO `th_question_answer` VALUES (3, '设某计算机采用微程序控制器，试说明微程序控制器的基本工作原理（即CPU执行指令时的操作过程）', '首先将用户程序的首地址送到PC，然后进入\n\n      取指阶段：①将取指周期微程序首地址M→CMAR\n\n                        ②取微指令：将对应控存M地址单元中的第一条微指令读到控存数据寄存器中，记为CM(CMAR)→CMDR\n\n                        ③产生微操作指令：第一条微指令的操作控制字段中为“1”的各位发出控制信号，如PC→MAR、I→R，命令主存    接收程序首地址并进行读操作。\n\n                        ④形成下一条微指令的地址：此微指令的顺序控制字段指出了下一条微指令的地址为M+1，将M+1送至CMAR，即Ad(CMDR)→CMAR\n\n                        ⑤取下一条微指令：将对应控存M+1地址单元中的第二条微指令读到CMDR中，即CM(CMAR)→CMDR\n\n                        ⑥产生微操作指令：由第二条微指令的操作控制字段中对应“1”的各位发出控制信号，如M(MAR)→MDR使对应主存2000H地址单元中的第一条机器指令从主存中读出，送至MDR中。\n\n                        ⑦形成下一条微指令地址：将第二条微指令下地址字段指出的地址M+2送至CMAR，即Ad(CMDR)→CMAR\n\n      执行阶段：①取数指令微程序首地址的形成：当取数指令存入IR后，其操作码OP(IR)直接送到微地址形成部件，该部件的输出即为取数指令微程序的首地址P，且将P送至CMAR，记作OP(IR)→微地址形成部件→CMAR\n\n                        ②取微指令：将对应控存P地址单元中的微指令读到CMDR中，记为CM(CMAR)→CMDR\n\n                        ③产生为操作命令：由微指令操作控制字段中对应“1”的各位发出控制信号，如Ad(IR)→MAR、I→R，命令主存读操作数。\n\n                        ④形成下一条微指令地址：将此条微指令下地址字段指出的P+1送至CMAR，即Ad(CMDR)→CMAR', '无解析', 12);

-- ----------------------------
-- Table structure for th_reply
-- ----------------------------
DROP TABLE IF EXISTS `th_reply`;
CREATE TABLE `th_reply`  (
  `reply_id` int(0) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(0) NULL DEFAULT NULL,
  `chapter_id` int(0) NULL DEFAULT NULL,
  `from_uid` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `to_uid` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`reply_id`) USING BTREE,
  INDEX `rfordiscusssion`(`discussion_id`) USING BTREE,
  INDEX `rforuser`(`from_uid`) USING BTREE,
  INDEX `to_uid`(`to_uid`) USING BTREE,
  INDEX `chapter_id`(`chapter_id`) USING BTREE,
  CONSTRAINT `rforuser` FOREIGN KEY (`from_uid`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_reply_ibfk_1` FOREIGN KEY (`discussion_id`) REFERENCES `th_discussion` (`discussion_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_reply_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `th_chapter` (`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_reply
-- ----------------------------
INSERT INTO `th_reply` VALUES (78, 19, NULL, 'stu023', NULL, '<p>发布者回复测试</p>\n', '2023-07-10 04:20:14');
INSERT INTO `th_reply` VALUES (79, 19, NULL, 'stu023', NULL, '<p>发布者带图回复测试</p>\n\n<p><img alt=\"\" height=\"114\" src=\"/files/user/stu023/ckeditor/ckeditor_2023_07_10122049887.png\" width=\"128\" /></p>\n', '2023-07-10 04:21:02');
INSERT INTO `th_reply` VALUES (80, 20, NULL, 'stu023', NULL, '<h1>富文本测试</h1>\n\n<h2><span style=\"color:#2ecc71\"><span style=\"background-color:#f1c40f\">富文本测试</span></span></h2>\n\n<h3><em><strong><u>富文本测试</u></strong></em></h3>\n\n<h4>富文本测试</h4>\n\n<h5>富文本测试</h5>\n', '2023-07-10 04:25:38');
INSERT INTO `th_reply` VALUES (81, 21, NULL, 'stu022', NULL, '<p>学生发布者回复测试1</p>\n', '2023-07-10 04:30:32');
INSERT INTO `th_reply` VALUES (82, 21, NULL, 'stu022', NULL, '<p>学生发布者回复测试2</p>\n', '2023-07-10 04:30:42');
INSERT INTO `th_reply` VALUES (83, 21, NULL, 'stu022', NULL, '<p>学生发布者回复测试3</p>\n', '2023-07-10 04:30:50');
INSERT INTO `th_reply` VALUES (84, 21, NULL, 'stu022', NULL, '<p>带图回复测试</p>\n\n<p><img alt=\"\" height=\"85\" src=\"/files/user/stu022/ckeditor/ckeditor_2023_07_10123126611.jpg\" width=\"109\" /></p>\n', '2023-07-10 04:31:46');
INSERT INTO `th_reply` VALUES (85, 20, NULL, 'stu022', NULL, '<p>学生发布回复测试1</p>\n', '2023-07-10 04:33:31');
INSERT INTO `th_reply` VALUES (86, 20, NULL, 'stu022', NULL, '<p>学生发布带图回复测试</p>\n\n<p><img alt=\"\" height=\"140\" src=\"/files/user/stu022/ckeditor/ckeditor_2023_07_10123350101.jpg\" width=\"155\" /></p>\n', '2023-07-10 04:33:59');
INSERT INTO `th_reply` VALUES (87, 19, NULL, 'stu022', NULL, '<p>学生编辑回复测试1</p>\n', '2023-07-10 04:43:08');
INSERT INTO `th_reply` VALUES (88, 19, NULL, 'stu022', 'stu023', '<p>学生评论回复测试1</p>\n', '2023-07-10 04:43:20');
INSERT INTO `th_reply` VALUES (89, 19, NULL, 'stu022', 'stu023', '<p>学生评论回复测试2</p>\n', '2023-07-10 04:43:30');
INSERT INTO `th_reply` VALUES (90, NULL, 181, 'stu022', NULL, '<p>学生发表评论测试</p>\n', '2023-07-10 04:44:07');
INSERT INTO `th_reply` VALUES (91, NULL, 181, 'stu022', NULL, '<p>学生发表带图评论测试</p>\n\n<p><img alt=\"\" height=\"108\" src=\"/files/user/stu022/ckeditor/ckeditor_2023_07_10124429244.jpg\" width=\"131\" /></p>\n', '2023-07-10 04:44:45');
INSERT INTO `th_reply` VALUES (92, NULL, 182, 'stu022', NULL, '<p>学生点赞测试</p>\n', '2023-07-10 04:45:24');
INSERT INTO `th_reply` VALUES (93, NULL, 181, 'stu013', NULL, '<p>学生发表评论测试</p>\n', '2023-07-10 04:53:40');
INSERT INTO `th_reply` VALUES (94, NULL, 181, 'stu013', 'stu022', '<p>学生回复评论测试</p>\n', '2023-07-10 04:53:52');
INSERT INTO `th_reply` VALUES (95, 19, NULL, 'stu013', NULL, '<p>学生编辑回复测试2</p>\n', '2023-07-10 04:54:36');
INSERT INTO `th_reply` VALUES (96, 19, NULL, 'stu013', 'stu022', '<p>学生评论回复测试3</p>\n', '2023-07-10 04:54:48');
INSERT INTO `th_reply` VALUES (97, 21, NULL, 'stu013', 'stu022', '<p>学生评论回复测试1</p>\n', '2023-07-10 04:58:09');
INSERT INTO `th_reply` VALUES (98, 22, NULL, 'stu013', NULL, '<div>栈与队列的相同点：</div>\n\n<div>1.都是线性结构。</div>\n\n<div>2.插入操作都是限定在表尾进行。</div>\n\n<div>3.都可以通过顺序结构和链式结构实现。、</div>\n\n<div>4.插入与删除的时间复杂度都是O（1），在空间复杂度上两者也一样。</div>\n\n<div>5.多链栈和多链队列的管理模式可以相同。</div>\n\n<div>栈与队列的不同点：</div>\n\n<div>1.删除数据元素的位置不同，栈的删除操作在表尾进行，队列的删除操作在表头进行。</div>\n\n<div>2.应用场景不同；常见栈的应用场景包括括号问题的求解，表达式的转换和求值，函数调用和递归实现，深度优先搜索遍历等；常见的队列的应用场景包括计算机系统中各种资源的管理，消息缓冲器的管理和广度优先搜索遍历等。</div>\n\n<div>3.顺序栈能够实现多栈空间共享，而顺序队列不能。</div>\n', '2023-07-11 02:32:52');
INSERT INTO `th_reply` VALUES (99, NULL, 182, 'stu013', NULL, '<p>学生评论测试</p>\n', '2023-07-11 02:54:27');
INSERT INTO `th_reply` VALUES (100, NULL, 182, 'stu013', 'stu022', '<p>学生回复测试</p>\n', '2023-07-11 02:54:35');
INSERT INTO `th_reply` VALUES (101, NULL, 181, 'root', NULL, '<p>加油哦！</p>\n', '2023-07-11 06:21:07');
INSERT INTO `th_reply` VALUES (102, NULL, 1, 'stu003', NULL, '<p>姐姐好好看</p>\n', '2023-07-11 06:57:51');
INSERT INTO `th_reply` VALUES (103, 22, NULL, 'stu003', NULL, '<p>栈（Stack）:是限定仅在表尾进行插入和删除操作的线性表。<br />\n&emsp;&emsp;我们把允许插入和删除的一端称为栈顶（top），另一端称为栈底（bottom），不含任何元素的栈称为空栈。栈又称为后进先出（Last In First Out）的线性表，简称LIFO结构。<br />\n&emsp;&emsp;理解栈的定义需要注意：<br />\n&emsp;&emsp;首先他是一个线性表，也就是说，栈元素具有线性关系，即前驱后继关系。只不过它是一种特殊的线性表而已。定义中说是在线性表的表尾进行插入和删除操作，这里表尾是指栈顶，而不是栈底。<br />\n&emsp;&emsp;它的特殊之处就在于限制了这个线性表的插入和删除位置，它始终只在栈顶进行。这也就使得：栈底是固定的，最先进栈的只能在栈底。</p>\n', '2023-07-11 07:00:41');

-- ----------------------------
-- Table structure for th_report
-- ----------------------------
DROP TABLE IF EXISTS `th_report`;
CREATE TABLE `th_report`  (
  `report_id` int(0) NOT NULL AUTO_INCREMENT,
  `experiment_id` int(0) NULL DEFAULT NULL,
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`report_id`) USING BTREE,
  INDEX `experiment_id`(`experiment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `th_report_ibfk_1` FOREIGN KEY (`experiment_id`) REFERENCES `th_experiment` (`experiment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_report
-- ----------------------------
INSERT INTO `th_report` VALUES (31, 28, 'stu023', '86503_测试数据.docx', '2023-07-11 14:33:08');
INSERT INTO `th_report` VALUES (32, 27, 'stu023', '94330_测试数据.docx', '2023-07-11 14:33:08');

-- ----------------------------
-- Table structure for th_resource
-- ----------------------------
DROP TABLE IF EXISTS `th_resource`;
CREATE TABLE `th_resource`  (
  `resource_id` int(0) NOT NULL AUTO_INCREMENT,
  `course_id` int(0) NOT NULL COMMENT '所在课程号',
  `resource_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `resource_size` double NULL DEFAULT NULL,
  `download_num` int(0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`resource_id`) USING BTREE,
  INDEX `reforcourse`(`course_id`) USING BTREE,
  CONSTRAINT `reforcourse` FOREIGN KEY (`course_id`) REFERENCES `th_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 335 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_resource
-- ----------------------------
INSERT INTO `th_resource` VALUES (302, 7, '84420_提问的智慧.pdf', 401.90625, 0, '2023-07-09 10:28:04');
INSERT INTO `th_resource` VALUES (303, 7, '20012_Maven配置.md', 0.576171875, 12, '2023-07-09 13:38:40');
INSERT INTO `th_resource` VALUES (304, 7, '28597_Java注解.md', 4.36328125, 44, '2023-07-09 13:38:49');
INSERT INTO `th_resource` VALUES (306, 7, '69798_User.java', 0.810546875, 20, '2023-07-09 13:41:10');
INSERT INTO `th_resource` VALUES (315, 7, '70728_Doc文件测试.docx', 16.142578125, 8, '2023-07-09 13:57:51');
INSERT INTO `th_resource` VALUES (317, 7, '76458_Excel文件测试.xlsx', 8.974609375, 33, '2023-07-09 14:01:17');
INSERT INTO `th_resource` VALUES (320, 7, '93817_无限-头像.png', 100.65625, 8, '2023-07-09 14:03:14');
INSERT INTO `th_resource` VALUES (321, 7, '58738_VUE生命周期.jpg', 101.0185546875, 6, '2023-07-09 14:05:59');
INSERT INTO `th_resource` VALUES (322, 7, '16889_PPT文件测试.pptx', 33.353515625, 19, '2023-07-09 14:16:55');
INSERT INTO `th_resource` VALUES (323, 7, '16889_Git学习笔记.md', 10.1337890625, 27, '2023-07-09 14:19:21');
INSERT INTO `th_resource` VALUES (324, 7, '16889_雷霆之怒告白神器.vbs', 2.5615234375, 11, '2023-07-09 13:20:22');
INSERT INTO `th_resource` VALUES (325, 2, '16890_第02讲+计算机的发展及应用.ppt', 1067, 0, '2023-07-11 08:01:52');
INSERT INTO `th_resource` VALUES (326, 2, '16890_第01讲+计算机系统概论.ppt', 715, 0, '2023-07-11 08:01:50');
INSERT INTO `th_resource` VALUES (327, 2, '16890_第4讲-4+辅助存储器.ppt', 1007.5, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (328, 2, '16890_第4讲-3+存储器3.ppt', 1320, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (329, 2, '16890_第3讲 数值及运算.pptx', 1965.1826171875, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (330, 2, '16890_第4讲-1+存储器1.ppt', 5091.5, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (331, 2, '16890_第07讲-1+控制单元的功能.ppt', 1485, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (332, 2, '16890_第05讲+指令系统.ppt', 2131, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (333, 2, '16890_第06讲+CPU+的结构和功能.ppt', 4820.5, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (334, 2, '16890_第07讲-2+控制单元的设计.ppt', 2276, 0, '2023-07-11 08:01:53');
INSERT INTO `th_resource` VALUES (335, 2, '16890_第00章+上课之前.ppt', 356.5, 0, '2023-07-11 08:00:30');

-- ----------------------------
-- Table structure for th_rotation_img
-- ----------------------------
DROP TABLE IF EXISTS `th_rotation_img`;
CREATE TABLE `th_rotation_img`  (
  `img_id` int(0) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `summary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`img_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_rotation_img
-- ----------------------------
INSERT INTO `th_rotation_img` VALUES (1, 'imgs/index/bk1.jpg', '繁星之辰', '高效优美的教育平台', '为天地立心，为生民立命，为往圣继绝学，为万世开太平', '2022-04-04 08:52:52');
INSERT INTO `th_rotation_img` VALUES (2, 'imgs/index/bk2.jpg', '数据结构', '授课老师 韩成 48学时', '数据结构是计算机存储、组织数据的方式', '2022-04-04 08:52:59');
INSERT INTO `th_rotation_img` VALUES (3, 'imgs/index/bk3.jpg', '计算机组成原理', '授课老师 刘于斐 76学时', '计算机组成原理主要讨论计算机单机系统的组成原理及其内部工作机制', '2022-04-04 08:53:02');
INSERT INTO `th_rotation_img` VALUES (4, 'imgs/index/bk4.jpg', '微机原理与汇编', '授课老师 王启闵 64学时', '包括：微型计算机系统概述、微处理器与总线、汇编语言程序设计、半导体存储器、可编程并行数字接口', '2022-04-04 08:53:04');
INSERT INTO `th_rotation_img` VALUES (5, 'imgs/index/bk5.jpg', '操作系统', '授课老师 赵雪梅 48学时', '操作系统是一组主管并控制计算机操作、运用和运行硬件、软件资源和提供公共服务来组织用户交互的相互关联的系统软件程序。', '2023-07-07 15:47:32');
INSERT INTO `th_rotation_img` VALUES (6, 'imgs/index/bk6.jpg', '编译原理', '授课老师 周学渊 48学时', '编译原理即是对高级程序语言进行翻译的一门科学技术', '2023-07-07 15:47:35');

-- ----------------------------
-- Table structure for th_score
-- ----------------------------
DROP TABLE IF EXISTS `th_score`;
CREATE TABLE `th_score`  (
  `score_id` int(0) NOT NULL AUTO_INCREMENT,
  `exam_id` int(0) NULL DEFAULT NULL COMMENT '考试id',
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学号',
  `score` int(0) NULL DEFAULT NULL COMMENT '学生总分',
  `objective_score` int(0) NULL DEFAULT NULL COMMENT '客观题总分',
  `is_checked` bit(1) NULL DEFAULT NULL COMMENT '试卷已判',
  `system_checked` bit(1) NULL DEFAULT NULL COMMENT '系统评分',
  PRIMARY KEY (`score_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `th_score_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `th_exam` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `th_score_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `th_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_score
-- ----------------------------
INSERT INTO `th_score` VALUES (7, 1, 'stu023', 60, 41, b'1', b'1');
INSERT INTO `th_score` VALUES (8, 1, 'stu013', 99, 63, b'1', b'1');
INSERT INTO `th_score` VALUES (9, 1, 'stu033', 86, 57, b'1', b'1');
INSERT INTO `th_score` VALUES (10, 1, 'tea002', 73, 41, b'1', b'1');
INSERT INTO `th_score` VALUES (11, 1, 'tea004', 62, 32, b'1', b'1');

-- ----------------------------
-- Table structure for th_true_false
-- ----------------------------
DROP TABLE IF EXISTS `th_true_false`;
CREATE TABLE `th_true_false`  (
  `subject_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '判断题id',
  `content` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '题目',
  `answer` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0-错误 1-正确',
  `analysis` varchar(2047) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案解析',
  `score` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_true_false
-- ----------------------------
INSERT INTO `th_true_false` VALUES (1, '冯·诺依曼计算机中指令和数据均以二进制形式存放在存储器中，CPU区分它们的依据是指令周期的不同阶段', '1', '无解析', 3);
INSERT INTO `th_true_false` VALUES (2, '某计算机的Cache共有16块，采用2路组相联映射方式（即每组2块）。每个主存块大小为32字节，按字节编址。主存129号单元所在主存块应装入到的Cache组号是2', '0', '无解析', 3);
INSERT INTO `th_true_false` VALUES (3, '某机器字长16位，主存按字节编址，转移指令采用相对寻址，由两个字节组成，第一字节为操作码字段，第二字节为相对位移量字段。假定取指令时，每取一个字节PC自动加1。若某转移指令所在主存地址为2000H，相对位移量字段的内容为06H，则该转移指令成功转移后的目标地址是2008H', '1', '无解析', 3);
INSERT INTO `th_true_false` VALUES (5, '<p>星辰是我的好朋友吗？</p>\n', '1', '<p>因为星辰是我好朋友a</p>\n', 5);

-- ----------------------------
-- Table structure for th_user
-- ----------------------------
DROP TABLE IF EXISTS `th_user`;
CREATE TABLE `th_user`  (
  `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id用于登陆',
  `password` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `telephone` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `question1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父亲名称',
  `answer1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '母亲名称',
  `question2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '自定义问题',
  `answer2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案',
  `user_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像路径',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of th_user
-- ----------------------------
INSERT INTO `th_user` VALUES ('root', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '秦晓润', '10000000001', '10000000001@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/root/avatar/avatar_2022_05_06203147703.png');
INSERT INTO `th_user` VALUES ('stu003', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '章北海', '10000000002', '10000000002@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/imgs/user/default.jpg');
INSERT INTO `th_user` VALUES ('stu013', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '林诗情', '10000000003', '10000000003@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/stu013/avatar/avatar_2022_05_07194806019.jpg');
INSERT INTO `th_user` VALUES ('stu022', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '温喆月', '10000000004', '10000000004@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/imgs/user/default.jpg');
INSERT INTO `th_user` VALUES ('stu023', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '赵珣笙', '10000000005', '10000000005@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/stu023/avatar/avatar_2023_07_09110847442.png');
INSERT INTO `th_user` VALUES ('stu033', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '何温祥', '10000000006', '10000000006@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/imgs/user/default.jpg');
INSERT INTO `th_user` VALUES ('stu043', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '张玉婷', '10000000007', '10000000007@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/stu033/avatar/cover_2022_04_16113139130.png');
INSERT INTO `th_user` VALUES ('tea001', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '李定波', '10000000008', '10000000008@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/tea001/avatar/avatar_2022_05_02104618854.jpg');
INSERT INTO `th_user` VALUES ('tea002', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '张禹乐', '10000000009', '10000000009@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/imgs/user/default.jpg');
INSERT INTO `th_user` VALUES ('tea003', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '鱼智慧', '10000000010', '10000000010@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/tea003/avatar/avatar_2022_05_10155314836.jpg');
INSERT INTO `th_user` VALUES ('tea004', '299bbc6453f96d5cb3e91f389a2df191748fb32623c293eeabec236f3184c468', '陈泓长', '10000000011', '10000000011@163.com', 'tan45°=', '1', '长风破浪会有时', '直挂云帆济沧海', '/files/user/tea004/avatar/avatar_2022_05_10154440583.jpg');

-- ----------------------------
-- View structure for th_course_user_view
-- ----------------------------
DROP VIEW IF EXISTS `th_course_user_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `th_course_user_view` AS select `th_course_user`.`id` AS `id`,`th_course_user`.`course_id` AS `course_id`,`th_course_user`.`user_id` AS `user_id`,`th_course_user`.`res_dl_num` AS `res_dl_num`,`th_course_user`.`discussion_create_num` AS `discussion_create_num`,`th_course_user`.`chapter_view_time` AS `chapter_view_time`,`th_course_user`.`chapter_view_num` AS `chapter_view_num`,`th_course_user`.`reply_num` AS `reply_num`,`th_user`.`username` AS `username`,`th_user`.`user_avatar` AS `user_avatar`,`th_course_user`.`create_time` AS `create_time` from (`th_course_user` join `th_user` on((`th_course_user`.`user_id` = `th_user`.`user_id`)));

-- ----------------------------
-- View structure for th_course_view
-- ----------------------------
DROP VIEW IF EXISTS `th_course_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `th_course_view` AS select `th_course`.`course_id` AS `course_id`,`th_course`.`course_name` AS `course_name`,`th_course`.`user_id` AS `user_id`,`th_course`.`is_start` AS `is_start`,`th_course`.`is_public` AS `is_public`,`th_course`.`cover_img` AS `cover_img`,`th_course`.`describes` AS `describes`,`th_course`.`create_time` AS `create_time`,`th_user`.`username` AS `username` from (`th_course` join `th_user` on((`th_course`.`user_id` = `th_user`.`user_id`)));

-- ----------------------------
-- View structure for th_discussion_view
-- ----------------------------
DROP VIEW IF EXISTS `th_discussion_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `th_discussion_view` AS select `th_discussion`.`discussion_id` AS `discussion_id`,`th_discussion`.`course_id` AS `course_id`,`th_discussion`.`user_id` AS `user_id`,`th_discussion`.`title` AS `title`,`th_discussion`.`content` AS `content`,`th_discussion`.`hits` AS `hits`,`th_discussion`.`likes` AS `likes`,`th_discussion`.`create_time` AS `create_time`,`th_user`.`username` AS `username`,`th_user`.`user_avatar` AS `user_avatar` from (`th_discussion` join `th_user` on((`th_discussion`.`user_id` = `th_user`.`user_id`)));

-- ----------------------------
-- View structure for th_notice_view
-- ----------------------------
DROP VIEW IF EXISTS `th_notice_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `th_notice_view` AS select `th_notice`.`notice_id` AS `notice_id`,`th_notice`.`course_id` AS `course_id`,`th_notice`.`title` AS `title`,`th_notice`.`content` AS `content`,`th_notice`.`hits` AS `hits`,`th_notice`.`create_time` AS `create_time`,`th_user`.`username` AS `username` from ((`th_notice` join `th_course` on((`th_notice`.`course_id` = `th_course`.`course_id`))) join `th_user` on((`th_course`.`user_id` = `th_user`.`user_id`)));

-- ----------------------------
-- View structure for th_reply_view
-- ----------------------------
DROP VIEW IF EXISTS `th_reply_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `th_reply_view` AS select `th_reply`.`reply_id` AS `reply_id`,`th_reply`.`discussion_id` AS `discussion_id`,`th_reply`.`from_uid` AS `from_uid`,`th_reply`.`to_uid` AS `to_uid`,`th_reply`.`content` AS `content`,`th_reply`.`create_time` AS `create_time`,`uf`.`username` AS `from_username`,`ut`.`username` AS `to_username`,`uf`.`user_avatar` AS `from_user_avatar`,`th_reply`.`chapter_id` AS `chapter_id` from ((`th_reply` left join `th_user` `uf` on((`uf`.`user_id` = `th_reply`.`from_uid`))) left join `th_user` `ut` on((`ut`.`user_id` = `th_reply`.`to_uid`)));

-- ----------------------------
-- View structure for th_test
-- ----------------------------
DROP VIEW IF EXISTS `th_test`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `th_test` AS select `th_course`.`course_id` AS `course_id`,`th_course`.`course_name` AS `course_name`,`th_course`.`user_id` AS `user_id`,`th_course`.`is_start` AS `is_start`,`th_course`.`is_public` AS `is_public`,`th_course`.`cover_img` AS `cover_img`,`th_course`.`describes` AS `describes`,`th_course`.`create_time` AS `create_time`,`th_user`.`username` AS `username` from (`th_course` join `th_user` on((`th_course`.`user_id` = `th_user`.`user_id`)));

SET FOREIGN_KEY_CHECKS = 1;
