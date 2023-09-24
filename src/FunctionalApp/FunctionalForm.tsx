import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

import FunctionalPhoneInput, { PhoneInputState } from "./FunctionalPhoneInput";

import React, { useState } from "react";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  setUserData,
}: {
  setUserData: (newUserData: UserInformation) => void;
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phone, setPhone] = useState<PhoneInputState>(["", "", "", ""]);
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });

  const { firstName, lastName, email, city } = userInput;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const validateFirstName = () => {
    const regex = /^[A-Za-z]{2,}$/;
    return regex.test(firstName);
  };
  const validateLastName = () => {
    const regex = /^[A-Za-z]{2,}$/;
    return regex.test(lastName);
  };
  const validateEmail = () => {
    return isEmailValid(email);
  };
  const validateCity = () => {
    const formattedCity = city.trim().toLowerCase();
    return allCities.map((c) => c.toLowerCase()).includes(formattedCity);
  };
  const validatePhone = () => {
    return phone.join("").length === 7;
  };

  const handleFormSubmission = () => {
    if (
      validateFirstName() &&
      validateLastName() &&
      validateEmail() &&
      validateCity() &&
      validatePhone()
    ) {
      setUserData({
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city,
        phone: phone.join(""),
      });
      setUserInput({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
      });
      setPhone(["", "", "", ""]);
      setFormSubmitted(false);
    } else {
      setFormSubmitted(true);
      alert("Bad Inputs");
    }
  };

  const fields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Bilbo",
      validation: validateFirstName,
      errorMessage: firstNameErrorMessage,
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Baggins",
      validation: validateLastName,
      errorMessage: lastNameErrorMessage,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "bilbo-baggins@adventurehobbits.net",
      validation: validateEmail,
      errorMessage: emailErrorMessage,
    },
    {
      label: "City",
      name: "city",
      placeholder: "Hobbiton",
      validation: validateCity,
      errorMessage: cityErrorMessage,
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmission();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {fields.map((field) => (
        <div key={field.name}>
          <div className="input-wrap">
            <label>{field.label}:</label>
            <input
              value={userInput[field.name as keyof typeof userInput]}
              name={field.name}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              {...(field.name === "city" && { list: "cities" })}
            />
          </div>
          <ErrorMessage
            message={field.errorMessage}
            show={!field.validation() && formSubmitted}
          />
        </div>
      ))}
      <FunctionalPhoneInput
        phoneInputState={phone}
        setPhoneInputState={setPhone}
      />
      <ErrorMessage
        message={phoneErrorMessage}
        show={!validatePhone() && formSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
