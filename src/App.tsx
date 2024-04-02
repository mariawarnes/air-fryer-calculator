import { useMemo, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Input from "./components/Input";
import Select from "./components/Select";
import { OptionType } from "./types";
import { unitOptions, methodOptions, fryTempOptions } from "./data";
import Button from "./components/Button";

function App() {
  const [unit, setUnit] = useState<OptionType | null>();
  const [method, setMethod] = useState<OptionType | null>();
  const [inputOvenTemp, setInputOvenTemp] = useState<number>(0);
  const [inputFryTemp, setInputFryTemp] = useState<OptionType | null>();
  const [inputMins, setInputMins] = useState<number>(0);
  const [ingredient, setIngredient] = useState<OptionType | null>(null);

  function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  const reset = () => {
    setIngredient(null);
    setUnit(null);
    setMethod(null);
    setInputOvenTemp(0);
    setInputFryTemp(null);
    setInputMins(0);
  };

  const calculateTotalsFunction = () => {
    const totals = { temp: 0, mins: 0 };

    if (method?.value === "oven") {
      if (unit?.value === "metric") {
        totals.temp = inputOvenTemp - 20;
      } else {
        totals.temp = inputOvenTemp - 30;
      }
    } else if (inputFryTemp && inputFryTemp.temperature) {
      if (unit?.value === "metric") {
        totals.temp = inputFryTemp.temperature - 20;
      } else {
        totals.temp = celsiusToFahrenheit(inputFryTemp.temperature - 20);
      }
    }
    totals.mins = inputMins * 0.8;

    return totals;
  };

  const calculateTotals = useMemo(calculateTotalsFunction, [
    method?.value,
    inputFryTemp,
    inputMins,
    unit?.value,
    inputOvenTemp,
  ]);

  return (
    <Card
      title="Air Fryer Calculator"
      description="Enter the frying or oven cooking time and temperature to calculate the equivalent air fryer cooking time."
    >
      <div className="flex flex-col gap-4">
        {/* <Select
          title="Ingredient (optional)"
          selected={ingredient}
          setSelected={setIngredient}
          options={ingredientOptions}
        /> */}
        <Select
          title="Unit"
          selected={unit}
          setSelected={setUnit}
          options={unitOptions}
        />
        <Select
          title="Original Cooking Method"
          selected={method}
          setSelected={setMethod}
          options={methodOptions}
        />
        {method?.value == "oven" && (
          <Input
            label={`Oven Temperature`}
            id="input-temp"
            placeholder={180}
            type="number"
            value={inputOvenTemp}
            onChange={(e) => setInputOvenTemp(Number(e.target.value))}
          />
        )}
        {method?.value == "fry" && (
          <Select
            title="Fry Temperature"
            selected={inputFryTemp}
            setSelected={setInputFryTemp}
            options={fryTempOptions}
          />
        )}
        {method && (
          <Input
            label={`${method?.title} Time`}
            id="input-time"
            placeholder={30}
            type="number"
            value={inputMins}
            onChange={(e) => setInputMins(Number(e.target.value))}
          />
        )}
      </div>

      <Button text={"Reset"} onClick={reset} />

      <div className="flex flex-col gap-4">
        <table className="w-full">
          <tbody>
            {(inputOvenTemp > 30 || inputFryTemp?.value !== undefined) && (
              <tr>
                <td className="font-bold">{`Air Fryer Temperature (${unit?.symbol})`}</td>
                <td>{Math.ceil(calculateTotals.temp / 10) * 10}</td>
              </tr>
            )}
            {inputMins !== 0 && (
              <tr>
                <td className="font-bold">Air Fryer Time (mins)</td>
                <td>{Math.round(calculateTotals.mins)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default App;
