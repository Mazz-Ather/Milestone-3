#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let registeredUsers: any = []; // Array to store user information (name, email, number, password)
async function main() {
  while (true) {
    const choices = await inquirer.prompt({
      type: "list",
      name: "choice",
      message: chalk.blue("What do you want to do today?"),
      choices: [" Register", " Sign In", " Browse Events", " Exit"],
    });

    switch (choices.choice) {
      case " Register":
        await handleRegistration();
        1;
        break;
      case " Sign In":
        await handleSignIn();
        break;
      case " Browse Events":
        await handleBrowseEvents();
        break;
      default:
        console.log(chalk.red("Exiting the application..."));
        process.exit(); // Exit the process on "Exit" choice
    }
  }
}
main();
//*----------------------------------------------------------------------------------------------
//! FOR BROWSING EVENTS
//*===============================================================================================
let pakCitites = [" Karachi", "Islamabad", "Lahore"];
let chinaCities = [
  "Beijing (PEK)",
  "Shanghai (PVG)",
  "Guangzhou (CAN)",
  "Shenzhen (SZX)",
  "Wuhan (WUH)",
  "Xiamen (XMN)",
  "Nanjing (NKG)",
  "Shenyang (SHE)",
];

let germanCities = [
  "Berlin (BER)",
  "Frankfurt am Main (FRA)",
  "Munich (MUC)",
  "Hamburg (HAM)",
  "Cologne/Bonn (CGN)",
  "Düsseldorf (DUS)",
  "Stuttgart (STR)",
];
let usaCities = [
  "New York City", // Include multiple major airports for NYC
  "Los Angeles (LAX)",
  "Chicago (ORD)",
  "San Francisco (SFO)",
  "Las Vegas (LAS)",
  "Washington D.C. (DCA, IAD)", // Include both Reagan National and Dulles International
  "Houston (IAH)",
  "San Jose (SJC)",
];
let saudiaCities = [
  "Riyadh (RUH)",
  "Jeddah (JED)",
  "Dammam (DMM)",
  "Medina (MED)",
  "Tabuk (TUU)",
  "Bishah (BHH)", // Added Bishah airport
];
async function handleBrowseEvents() {
  const events = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an event:",
      choices: [" Flight Ticket", " Cinema Tickets"], //* events select
    },
  ]);
  if (registeredUsers <= 0) {
    console.log(chalk.redBright("\nPLEASE , Register or Sign-In First\n"));
  } else {
    if (events.choice === " Flight Ticket") {
      const country = await inquirer.prompt([
        {
          type: "list",
          name: "from",
          message: "Which Country You Want To Fly From?",
          choices: ["Pakistan", "China", "Germany", "USA", "Saudi Arabia"], // * country select
        },
      ]);

      //* ----------------------------------------------------------------------------------------------
      //!1st country
      //*-_____________________________________________________________________________________________
      async function selectOriginAndDestination(
        fromCityChoices: any,
        toCityChoices: any
      ) {
        const cityFrom = await inquirer.prompt([
          {
            type: "list",
            name: "from",
            message: "Which City You Want To Fly From?",
            choices: fromCityChoices,
          },
        ]);

        const toCountry = await inquirer.prompt([
          {
            type: "list",
            name: "to",
            message: "To Which Country You Want To Fly To?",
            choices: ["Pakistan", "China", "Germany", "USA", "Saudi Arabia"],
          },
        ]);
        const cityTo = await inquirer.prompt([
          {
            type: "list",
            name: "to",
            message: "To Which City You Want To Fly To?",
            choices: toCityChoices[toCountry.to],
          },
        ]);

        if (cityTo.to === cityFrom.from) {
          console.log(
            chalk.redBright(
              "\nYou cannot fly from the same city to itself. Please choose a different destination city.\n"
            )
          );
          return;
        }
        let random = Math.floor(Math.random() * 8 + 2);

        console.log("--------------------------------------------------");
        console.log(`Your flight would be ${random} hours long`);
        console.log("---------------------------------------------------");

        await select(); // Assuming select() takes origin and destination cities
      }
      const cityChoices = {
        Pakistan: pakCitites,
        China: chinaCities,
        Germany: germanCities,
        USA: usaCities,
        "Saudi Arabia": saudiaCities,
      };

      if (country.from === "Pakistan") {
        await selectOriginAndDestination(pakCitites, cityChoices);
      } else if (country.from === "China") {
        await selectOriginAndDestination(chinaCities, cityChoices);
      } else if (country.from === "Germany") {
        await selectOriginAndDestination(germanCities, cityChoices);
      } else if (country.from === "USA") {
        await selectOriginAndDestination(usaCities, cityChoices);
      } else if (country.from === "Saudi Arabia") {
        await selectOriginAndDestination(saudiaCities, cityChoices);
      }
    } else if (events.choice === " Cinema Tickets") {
      console.log("***********************");
      console.log("Launching Soon");
      console.log("***********************");
    }
  }
}

//*----------------------------------------------------------------------------------------------
//! FOR REGISTRATION
//*===============================================================================================

async function handleRegistration() {
  const newUser = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: chalk.grey("Enter Your Name"),
      validate: function (value) {
        if (value.length == 0) {
          return chalk.red("Please Enter A Valid Name.");
        }
        return true;
      },
    },
    {
      type: "input",
      name: "email",
      message: chalk.grey("Enter Your Email:"),
      validate: function (value) {
        if (!/\S+@\S+\.\S+/.test(value)) {
          return chalk.red("Please enter a valid email address.");
        }
        return true;
      },
    },
    {
      type: "number",
      name: "number",
      message: chalk.grey("Enter Your Phone Number (Do not write first 0):"),
      validate: function (value) {
        if (isNaN(value) || value.toString().length !== 10) {
          return chalk.red("Please enter a valid phone number (10 digits).");
        }
        return true;
      },
    },
    {
      type: "password",
      name: "password",
      message: chalk.grey("Enter Your Password:"),
      validate: function (value) {
        if (value.length == 0) {
          return chalk.red("Please Enter A Valid Name.");
        }
        return true;
      },
    },
  ]);

  // Check for existing username or email
  if (
    registeredUsers.some(
      (user: any) => user.name === newUser.name || user.email === newUser.email
    )
  ) {
    console.log(
      chalk.yellow(
        "\nThat name or email is already taken. Please choose another.\n"
      )
    );
    return; // Exit registration if name or email exists
  }

  registeredUsers.push(newUser); // Store user information in the array
  console.log(
    chalk.yellow(
      "*****************************************************************************"
    )
  );
  console.log(
    chalk.green(
      `Welcome! ${newUser.name} You are now registered with our one-stop ticketing platform.`
    )
  );
  console.log(
    chalk.green("Get ready to book tickets for all your favorite Countries:")
  );
  console.log(
    chalk.yellow(
      "*****************************************************************************"
    )
  );

  console.log("***************************");
  console.log("Only One Step Left To Move Further");

  console.log("Please Sign In");
  console.log("***************************");

  await handleSignIn();

  //*----------------------------------------------------------------------------------------------
  //! FOR SIGN IN
  //*===============================================================================================

  var user: any = [];
  user.push(newUser);
  var pass: any = [];
  pass.push(newUser);
}
async function handleSignIn() {
  const signIn = await inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: chalk.grey("Please Select Your Account Type:"),
      choices: ["Admin", "User"],
    },
  ]);
  if (signIn.choices === "User") {
    // if(registeredUsers > 0 ){
    const login = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: chalk.grey("Enter Your Name"),
        validate: function (value) {
          if (value.length == 0) {
            return chalk.red("Please Enter A Valid Name.");
          }
          return true;
        },
      },
      {
        type: "password",
        name: "password",
        message: chalk.grey("Enter Your Password:"),
        validate: function (value) {
          if (value.length == 0) {
            return chalk.red("Please Enter A Valid Name.");
          }
          return true;
        },
      },
    ]);

    const foundUser = registeredUsers.find(
      (user: any) => user.name === login.name
    ); // Find user by name in registeredUsers

    if (foundUser && foundUser.password === login.password) {
      // Check both name and password
      console.log(chalk.green("Login Successful!"));
    } else {
      console.log(
        chalk.red("Login Failed!\nPlease check your username and password.")
      );
      await handleRegistration();
    }
  } else if (signIn.choices === "Admin") {
    const adminLogin = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: chalk.grey("Enter Admin Username:"),
        validate: function (value) {
          if (value.length === 0) {
            return chalk.red("Please Enter A Valid Username.");
          }
          return true;
        },
      },
      {
        type: "password",
        name: "password",
        message: chalk.grey("Enter Admin Password:"),
        validate: function (value) {
          if (value.length === 0) {
            return chalk.red("Please Enter A Valid Password.");
          }
          return true;
        },
      },
    ]);

    // Check for valid admin credentials (replace with actual admin username and password)
    if (adminLogin.username === "admin" && adminLogin.password === "admin123") {
      console.log(chalk.green("Admin Login Successful!"));
      await handleAdminMenu(); // Call admin menu function
    } else {
      console.log(chalk.red("Invalid Admin Credentials!"));
      await main();
    }
  }
}

async function handleAdminMenu() {
  const adminChoice = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: chalk.grey("Admin Menu:"),
      choices: ["Create Event", "View Registered Users", "Exit"],
    },
  ]);

  switch (adminChoice.choice) {
    case "Create Event":
      await createEvent();
      break;
    case "View Registered Users":
      await viewUsers();
      break;
    case "Exit":
      console.log(chalk.green("Exiting Admin Menu..."));
      break;
  }
}
//?===================================================================================================================
//*                              create event
//!_----------------------------------------------------------------------------------------------------------------

async function createEvent() {
  const newEvent = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: chalk.grey("Enter Event Title:"),
      validate: function (value) {
        if (value.length === 0) {
          return chalk.red("Please Enter A Valid Event Title.");
        }
        return true;
      },
    },
    {
      type: "number",
      name: "time",
      message: chalk.grey("Enter Event Time (24-hour format):"),
      validate: function (value) {
        if (isNaN(value) || value < 0 || value > 23) {
          return chalk.red("Please Enter A Valid Time (0-23).");
        }
        return true;
      },
    },
    {
      type: "input",
      name: "city",
      message: chalk.grey("Enter Event City:"),
      validate: function (value) {
        if (value.length === 0) {
          return chalk.red("Please Enter A Valid Event City.");
        }
        return true;
      },
    },
    {
      type: "number",
      name: "stock",
      message: chalk.grey("Enter Initial Ticket Stock:"),
      validate: function (value) {
        if (isNaN(value) || value < 0) {
          return chalk.red(
            "Please Enter A Valid Ticket Stock (positive number)."
          );
        }
        return true;
      },
    },
  ]);

  console.log(
    `you make ${newEvent.title} event , which will be held on ${newEvent.time} in ${newEvent.city} city, the total stock of ticket is ${newEvent.stock}`
  );
}

//?===================================================================================================================
//*                              view users
//!_----------------------------------------------------------------------------------------------------------------
async function viewUsers() {
  console.log(registeredUsers);
}

//?===================================================================================================================
//*                              select
//!_----------------------------------------------------------------------------------------------------------------

async function select() {
  const date = await inquirer.prompt([
    {
      type: "list",
      name: "date",
      message: " On Which Date You Want To Fly ?",
      choices: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21st",
        "22nd",
        "23rd",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
      ],
    },
    {
      type: "list",
      name: "month",
      message: " On Which month You Want To Fly ?",
      choices: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    {
      type: "list",
      name: "year",
      message: "On Which Year You Want To Fly ?",
      choices: ["2024", "2025", "2026"],
    },
  ]);
  if (
    date.month === "March" ||
    date.moth === "February" ||
    date.month === "April"
  ) {
    console.log(
      chalk.redBright("\nSorry , We Are Not Providing Flight On This Date\n")
    );
  } else {
    let randomElders = Math.floor(Math.random() * 2000 + 1200);

    console.log("*******************************************");
    console.log(`One Elder Ticket Cost ${randomElders}$`);
    console.log("*******************************************");

    const ticketsElder = await inquirer.prompt([
      {
        type: "list",
        name: "elders",
        message: "How Many Tickets Do You Want for Elders ? ",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
    ]);
    let randomChild = Math.floor(Math.random() * 1000 + 400);
    console.log("*******************************************");
    console.log(`One Child Ticket Cost ${randomChild}$`);
    console.log("*******************************************");

    const ticketsChild = await inquirer.prompt([
      {
        type: "list",
        name: "child",
        message: "How Many Tickets Do You Want for Children ? ",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
    ]);
    const elderTickets = parseInt(ticketsElder.elders); // Convert selection to number
    const childTickets = parseInt(ticketsChild.child);

    const elderCharge = elderTickets * randomElders;
    const childCharge = childTickets * randomChild;
    const totalCharge = elderCharge + childCharge;

    console.log(
      `\nYou selected ${elderTickets} Elder tickets and ${childTickets} Children tickets.`
    );

    if (elderTickets > 0 || childTickets > 0) {
      console.log(`\nYour total charges are:`);
      console.log(`- Elder Tickets: $${elderCharge}`);
      console.log(`- Children Tickets: $${childCharge}`);
      console.log("****************************************");
      console.log(`- Total: $${totalCharge}`);
      console.log("****************************************");
    } else {
      console.log("You did not select any tickets.");
    }
    const charges = await inquirer.prompt([
      {
        type: "list",
        name: "charges",
        message: "How Do You Want To Pay ?",
        choices: ["paypal", "Bank Account"],
      },
    ]);
    let paypal: number = 50000;

    if (charges.charges === "paypal") {
      console.log("you have to login on paypal");
      const login = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: chalk.grey("Enter Your Name"),
          validate: function (value) {
            if (value.length == 0) {
              return chalk.red("Please Enter A Valid Name.");
            }
            return true;
          },
        },
        {
          type: "number",
          name: "number",
          message: chalk.grey(
            "Enter Your Paypal Account Number (must be 11 digits):"
          ),
          validate: function (value) {
            if (isNaN(value) || value.toString().length !== 11) {
              return chalk.red(
                "Please enter a valid account number (11 digits)."
              );
            }
            return true;
          },
        },
      ]);
      if (login.name && login.number) {
        console.log("logged in successfully ");
        console.log("******************************************");
        console.log(`Your Paypal Acoount Balance Is ${paypal}$`);
        console.log("******************************************");
      }
      if (paypal >= totalCharge) {
        const paymentConfirmation = await inquirer.prompt([
          {
            type: "confirm",
            name: "pay",
            message: `Your total charges are: $${totalCharge}. Do you want to pay now?`,
          },
        ]);

        if (paymentConfirmation.pay) {
          console.log("*************************************************");
          console.log(chalk.greenBright("\nTickets booked successfully!"));
          console.log("*************************************************");
          console.log(`Your remaining Balance is ${paypal - totalCharge}`);
        } else {
          console.log(
            "----------------------------------------------------------"
          );

          console.log(
            chalk.yellow(
              "\nPayment not confirmed. You have to pay first to book tickets."
            )
          );
          console.log(
            "--------------------------------------------------------------"
          );
        }
      } else {
        console.log(
          chalk.redBright("\nInsufficient funds in your PayPal account.")
        );
      }
      //* bank account
    } else if (charges.charges === "Bank Account") {
      console.log("you have to Login In your Bank Account");
      const login = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: chalk.grey("Enter Your Name"),
          validate: function (value) {
            if (value.length == 0) {
              return chalk.red("Please Enter A Valid Name.");
            }
            return true;
          },
        },
        {
          type: "number",
          name: "credit",
          message: chalk.grey(
            "Enter Your credit card Account Number (must be 11 digits):"
          ),
          validate: function (value) {
            if (isNaN(value) || value.toString().length !== 11) {
              return chalk.red(
                "Please enter a valid account number (11 digits)."
              );
            }
            return true;
          },
        },
      ]);
      if (login.name && login.credit) {
        console.log("logged in successfully ");
      }

      let myBalance: number = 10000;
      console.log(
        "**************************************************************"
      );
      await console.log(
        `${chalk.green(`\n YOUR CURRENT BALANCE IS  '${myBalance}'$ \n`)}`
      );
      console.log(
        "**************************************************************"
      );

      while (true) {
        let method = await inquirer.prompt([
          {
            name: "method",
            type: "list",
            message: chalk.black("Select Your Method"),
            choices: ["Deposit", "Pay To Ticekts", "Quit"],
          },
        ]);

        if (method.method === "Deposit") {
          let addMoney = await inquirer.prompt([
            {
              name: "add",
              type: "number",
              message: chalk.black("How much do you want to deposit?"),
            },
          ]);
          myBalance += addMoney.add;
          console.log(chalk.blue(`Now Your Current Balance Is ${myBalance}\n`));
        }

        if (method.method === "Quit") {
          console.log(chalk.green("byee byee"));

          process.exit();
        } else if (method.method === "Pay To Ticekts") {
          if (myBalance >= totalCharge) {
            const paymentConfirmation = await inquirer.prompt([
              {
                type: "confirm",
                name: "pay",
                message: `Do you want to Confirm Your Payment now?`,
              },
            ]);

            if (paymentConfirmation.pay) {
              console.log("*************************************************");
              console.log(chalk.greenBright("\nTickets booked successfully!"));
              console.log("*************************************************");
              console.log(
                `Your remaining Balance is ${myBalance - totalCharge}`
              );
            } else {
              console.log(
                "----------------------------------------------------------"
              );

              console.log(
                chalk.yellow(
                  "\nPayment not confirmed. You have to pay first to book tickets."
                )
              );
              console.log(
                "--------------------------------------------------------------"
              );
            }
          } else {
            console.log(
              chalk.redBright("\nInsufficient funds in your Bank Account.")
            );
          }
        }
      }
    }
  }
}
