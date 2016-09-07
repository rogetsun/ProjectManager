-- MySQL Script generated by MySQL Workbench
-- Wed Sep  7 12:45:07 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pm
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pm` DEFAULT CHARACTER SET utf8 ;
USE `pm` ;

-- -----------------------------------------------------
-- Table `pm`.`d_project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_project` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_project` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(100) NULL,
  `project_desc` VARCHAR(1000) NULL,
  `create_time` BIGINT(13) NULL,
  `create_login_id` INT NULL COMMENT '创建项目人id',
  PRIMARY KEY (`project_id`))
ENGINE = InnoDB
COMMENT = '项目表';


-- -----------------------------------------------------
-- Table `pm`.`d_function`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_function` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_function` (
  `func_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `func_code` VARCHAR(10) NULL,
  `func_name` VARCHAR(100) NOT NULL,
  `par_func_id` INT NULL,
  `create_time` BIGINT(13) NULL,
  `create_login_id` INT NULL,
  PRIMARY KEY (`func_id`))
ENGINE = InnoDB
COMMENT = '项目功能树';


-- -----------------------------------------------------
-- Table `pm`.`d_file_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_file_type` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_file_type` (
  `ft_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `ft_folder` VARCHAR(100) NOT NULL,
  `ft_name` VARCHAR(100) NOT NULL,
  `ft_desc` VARCHAR(1000) NULL,
  `create_time` BIGINT(13) NULL,
  `create_login_id` INT NULL,
  PRIMARY KEY (`ft_id`))
ENGINE = InnoDB
COMMENT = '按文件类型配置项目目录，比如{类文件,\'WEB-IN' /* comment truncated */ /*F/classes'},{静态文件,web},{web配置文件,WEB-INF},{类配置文件,WEB-INF/classes},{jar文件,WEB-INF/lib}
{java文件,src}*/;


-- -----------------------------------------------------
-- Table `pm`.`d_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_file` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_file` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `file_path_name` VARCHAR(100) NOT NULL,
  `curr_version` INT NOT NULL DEFAULT 1,
  `file_desc` VARCHAR(1000) NULL,
  `ft_id` INT NULL,
  `create_time` BIGINT(13) NULL,
  `create_login_id` INT NULL,
  PRIMARY KEY (`file_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pm`.`d_file_his`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_file_his` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_file_his` (
  `file_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `file_path_name` VARCHAR(100) NOT NULL,
  `version` INT NOT NULL,
  `file_desc` VARCHAR(1000) NULL,
  `ft_id` INT NULL,
  `create_time` BIGINT(13) NOT NULL,
  `create_login_id` INT NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pm`.`d_func_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_func_file` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_func_file` (
  `ff_id` INT NOT NULL AUTO_INCREMENT,
  `func_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  `file_version` INT NOT NULL,
  `op_time` BIGINT(13) NULL,
  `op_login_id` INT NULL,
  PRIMARY KEY (`ff_id`))
ENGINE = InnoDB
COMMENT = '模块文件';


-- -----------------------------------------------------
-- Table `pm`.`d_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_login` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_login` (
  `login_id` INT NOT NULL AUTO_INCREMENT,
  `login_no` VARCHAR(100) NOT NULL,
  `login_name` VARCHAR(100) NOT NULL,
  `login_password` VARCHAR(100) NOT NULL,
  `role_id` INT NOT NULL DEFAULT 1 COMMENT '管理员0，普通1',
  PRIMARY KEY (`login_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `login_no_UNIQUE` ON `pm`.`d_login` (`login_no` ASC);


-- -----------------------------------------------------
-- Table `pm`.`d_bug`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_bug` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_bug` (
  `bug_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `bug_name` VARCHAR(100) NOT NULL,
  `bug_desc` VARCHAR(1000) NULL,
  `create_time` BIGINT(13) NOT NULL,
  `create_login_id` INT NOT NULL,
  PRIMARY KEY (`bug_id`))
ENGINE = InnoDB
COMMENT = '项目bug列表';


-- -----------------------------------------------------
-- Table `pm`.`d_bug_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pm`.`d_bug_file` ;

CREATE TABLE IF NOT EXISTS `pm`.`d_bug_file` (
  `bf_id` INT NOT NULL AUTO_INCREMENT,
  `bug_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  `file_version` INT NOT NULL,
  `op_time` BIGINT(13) NOT NULL,
  `op_login_id` INT NOT NULL,
  PRIMARY KEY (`bf_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `pm`.`d_login`
-- -----------------------------------------------------
START TRANSACTION;
USE `pm`;
INSERT INTO `pm`.`d_login` (`login_id`, `login_no`, `login_name`, `login_password`, `role_id`) VALUES (1, 'songyw', '宋有伟', '24beddfef1014a7fc5389f1db8a8686b', DEFAULT);
INSERT INTO `pm`.`d_login` (`login_id`, `login_no`, `login_name`, `login_password`, `role_id`) VALUES (2, 'litx', '李天星', '53cda6db609352e4aca84f6e9f2f1b86', DEFAULT);

COMMIT;

