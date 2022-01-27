#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

let playerName;
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a Millionaire?\n"
  );

  await sleep();

  rainbowTitle.stop();

  //${chalk.yellow(figlet.textSync('Millionaire', { horizontalLayout: 'full' }))}
  console.log(`
    ${chalk.bgBlue("How To Play")}
    I'm a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "playerName",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.playerName;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Javascript was created in 10 days then released on\n",
    choices: [
      "October 14, 1995",
      "October 20, 1995",
      "December 21, 1995",
      "December 4, 1995",
    ],
  });
  return handleAnswer(answers.question1 == "December 4, 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice Work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `Oh no ${playerName}. That's not a legit answer` });
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const message = `Millionaire!`;

  figlet(message, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await winner();
