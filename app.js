#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.magentaBright("\n<<<<<<<<<<<<<STUDENT MANAGEMENT SYSTEM>>>>>>>>>>>>>\n"));
//Random student ID
const randomNumber = Math.floor(10000 + Math.random() * 90000);
//balance before course payment
let myBalance = 0;
//student name
let answer = await inquirer.prompt([{
        name: "students",
        type: "input",
        message: chalk.yellowBright("Enter student name:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return (chalk.redBright("Please enter a non-empty value."));
        }
    },
    {
        name: "courses",
        type: "list",
        message: chalk.yellowBright("select the course to get enrolled"),
        choices: ["MS office", "Web development", "graphic designing", "wordpress"]
    }
]);
//courses with fees amount
const tutionFee = {
    "MS office": 2000,
    "Web development": 6000,
    "graphic designing": 3000,
    "wordpress": 2500
};
console.log(chalk.greenBright(`\nTution Fees: ${tutionFee[answer.courses]}/-\n `));
console.log(chalk.greenBright(`Balance: ${myBalance}\n`));
//payment methods
let paymentType = await inquirer.prompt([{
        name: "payment",
        type: "list",
        message: chalk.yellowBright("Select payment method"),
        choices: ["Bank Transfer", "EasyPaisa", "Jazzcash"]
    },
    {
        name: "amount",
        type: "input",
        message: (chalk.yellowBright("Transfer Money")),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return (chalk.redBright("Please enter a non-empty value."));
        }
    }
]);
console.log(chalk.magentaBright(`\n You select payment method ${paymentType.payment}`));
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.magentaBright(`Congratulations, you have successfully enrolled in ${answer.courses}.\n`));
    let ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: (chalk.yellowBright("What would you like to do next?")),
            choices: ["view status", "Exit"]
        }]);
    if (ans.select === "view status") {
        console.log(chalk.greenBright("\n********Status********\n"));
        console.log(chalk.yellowBright(`Student Name: ${answer.students}`));
        console.log(chalk.yellowBright(`Student ID: ${randomNumber}`));
        console.log(chalk.yellowBright(`Course: ${answer.courses}`));
        console.log(chalk.yellowBright(`Tution Fees Paid: ${paymentAmount}`));
        console.log(chalk.yellowBright(`Balance: ${myBalance += paymentAmount}`));
    }
}
else {
    console.log(chalk.redBright("Invalid amount due to course\n"));
}
