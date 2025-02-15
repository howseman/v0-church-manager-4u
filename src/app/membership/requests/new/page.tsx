"use client";
import { FormEvent } from "react";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData);
  console.log(data);
}

export default function NewMembershipRequest() {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div>
        <label htmlFor="input1">Input 1:</label>
        <input
          type="text"
          id="input1"
          name="input1"
          placeholder="Enter input 1"
        />
      </div>
      <div>
        <label htmlFor="input2">Input 2:</label>
        <input
          type="text"
          id="input2"
          name="input2"
          placeholder="Enter input 2"
        />
      </div>
      <div>
        <label htmlFor="input3">Input 3:</label>
        <input
          type="text"
          id="input3"
          name="input3"
          placeholder="Enter input 3"
        />
      </div>
      <div>
        <label htmlFor="input4">Input 4:</label>
        <input
          type="text"
          id="input4"
          name="input4"
          placeholder="Enter input 4"
        />
      </div>
      <div>
        <label htmlFor="input5">Input 5:</label>
        <input
          type="text"
          id="input5"
          name="input5"
          placeholder="Enter input 5"
        />
      </div>
      <div>
        <label>Radio Group 1:</label>
        <input type="radio" id="radio1" name="radioGroup1" value="option1" />
        <label htmlFor="radio1">Option 1</label>
        <input type="radio" id="radio2" name="radioGroup1" value="option2" />
        <label htmlFor="radio2">Option 2</label>
      </div>
      <div>
        <label>Radio Group 2:</label>
        <input type="radio" id="radio3" name="radioGroup2" value="option1" />
        <label htmlFor="radio3">Option 1</label>
        <input type="radio" id="radio4" name="radioGroup2" value="option2" />
        <label htmlFor="radio4">Option 2</label>
      </div>
      <div>
        <input type="checkbox" id="checkbox1" name="checkbox1" />
        <label htmlFor="checkbox1">Checkbox 1</label>
      </div>
      <div>
        <input type="checkbox" id="checkbox2" name="checkbox2" />
        <label htmlFor="checkbox2">Checkbox 2</label>
      </div>
      <div>
        <label htmlFor="textarea1">Textarea 1:</label>
        <textarea
          id="textarea1"
          name="textarea1"
          placeholder="Enter text here"
        ></textarea>
      </div>
      <div>
        <label htmlFor="textarea2">Textarea 2:</label>
        <textarea
          id="textarea2"
          name="textarea2"
          placeholder="Enter text here"
        ></textarea>
      </div>
      <div>
        <label htmlFor="dropdown1">Dropdown 1:</label>
        <select id="dropdown1" name="dropdown1">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="dropdown2">Dropdown 2:</label>
        <select id="dropdown2" name="dropdown2">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="dropdown3">Dropdown 3:</label>
        <select id="dropdown3" name="dropdown3">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
