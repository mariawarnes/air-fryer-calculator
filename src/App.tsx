import { useMemo, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Select from "./components/Select";
import { Option } from "./types";

function App() {
  const [unit, setUnit] = useState<Option>();
  const [method, setMethod] = useState<Option>();
  const [inputOvenTemp, setInputOvenTemp] = useState<number>(0);
  const [inputFryTemp, setInputFryTemp] = useState<Option>();
  const [inputMins, setInputMins] = useState<number>(0);

  function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

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

  const unitOptions = [
    {
      title: "Metric (C°)",
      value: "metric",
      symbol: "C°",
    },
    {
      title: "Imperial (F°)",
      value: "imperial",
      symbol: "F°",
    },
  ];

  const methodOptions = [
    {
      title: "Oven",
      value: "oven",
    },
    {
      title: "Pan Fry",
      value: "fry",
    },
  ];

  const fryTempOptions = [
    {
      title: "High Heat",
      value: "high",
      temperature: 232,
    },
    {
      title: "Medium-High Heat",
      value: "med-high",
      temperature: 218,
    },
    {
      title: "Medium",
      value: "med",
      temperature: 177,
    },
    {
      title: "Low",
      value: "low",
      temperature: 150,
    },
  ];

  return (
    <Card
      title="Convert Oven Time to Air Fryer Time"
      description="Enter the oven cooking time and temperature to calculate the equivalent air fryer cooking time."
    >
      <div className="flex flex-col gap-4">
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
