  /*---------------This will contain all the mysql statement use in creating the Database  and  tables and the reason behind them-------------------------------------------*/

  CREATE SCHEMA `keyboard_app` ;

  /*the code above create a new schema */

 /*The state */
 CREATE TABLE `keyboard_app`.`new_table` (
  `username` VARCHAR(50) NOT NULL,
  `email_address` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `middle_name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `is_deleted` VARCHAR(45) NOT NULL DEFAULT 'false',
  `event_date` DATE NOT NULL,
  `event_time` TIME NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `email_address_UNIQUE` (`email_address` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);
 /*---------------------------------------- */


/*makes the signing up process faster and more secure*/
CREATE TABLE `keyboard_app`.`pre_signup` (
  `email_address` VARCHAR(50) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `is_deleted` VARCHAR(45) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`email_address`, `username`));
/*---------------------------------------------------*/

/*------login check---------------*/
CREATE TABLE `keyboard_app`.`login_check` (
  `email_address` VARCHAR(50) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email_address`));

  /*----------------------------*/




