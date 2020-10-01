import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { useForm } from "react-hook-form";

const TestPage = () => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log("rendered");

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input name="firstname" ref={register} /> {/* register an input */}
    //   <input name="lastname" ref={register({ required: true })} />
    //   {errors.lastname && "Last name is required."}
    //   <input name="age" ref={register({ pattern: /\d+/ })} />
    //   {errors.age && "Please enter number for age."}
    //   <input type="submit" />
    // </form>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        placeholder="Height"
        name="Height"
        ref={register({ required: true, max: 50, min: 0, maxLength: 80 })}
      />
      <input
        type="number"
        placeholder="Width"
        name="Width"
        ref={register({ required: true, max: 50, min: 0, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="tel"
        placeholder="Mobile number"
        name="Mobile number"
        ref={register({ required: true, minLength: 6, maxLength: 12 })}
      />
      <select name="Title" ref={register({ required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input
        name="Developer"
        type="radio"
        value="Yes"
        ref={register({ required: true })}
      />
      <input
        name="Developer"
        type="radio"
        value="No"
        ref={register({ required: true })}
      />

      <input type="submit" />
    </form>
  );
};
export default TestPage;
