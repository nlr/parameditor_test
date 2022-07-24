import React from 'react';

const params = [
  { id: 1, name: 'Назначение' },
  { id: 2, name: 'Длина' },
  { id: 3, name: 'Высота' },
  { id: 4, name: 'Что-то еще' },
  { id: 5, name: 'Глубина' },
  { id: 6, name: 'Белизна' },
];

const model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
    { paramId: 3, value: 'высоко' },
  ],
};

interface Param {
  id: number;
  name: string;
  type?: `string`;
}

interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
}

type ParamEditorProps = {
  params: Param[];
  model: Model;
};

const ParamEditor = (props: ParamEditorProps) => {
  const [model, setModel] = React.useState(props.model);

  const getModel = () => {
    return console.log(model);
  };

  const updateValue = (newValue: string, id: number) => {
    let paramIndex = model.paramValues.findIndex(
      (param) => param.paramId === id,
    );

    let paramValues = [...model.paramValues];

    if (paramIndex === -1) {
      paramValues = [...paramValues, { paramId: id, value: newValue }];
      paramIndex = paramValues.length - 1; // new param index
    }

    const currentParam = { ...paramValues[paramIndex] };
    const newParam = { ...currentParam, value: newValue };

    paramValues[paramIndex] = newParam;

    setModel((current) => {
      return {
        ...current,
        paramValues: paramValues,
      };
    });
  };

  return (
    <>
      {props.params.map((value, index) => {
        const inputDataIndex = model.paramValues.findIndex(
          (param) => param.paramId === value.id,
        );
        const inputData =
          inputDataIndex !== -1 ? model.paramValues[inputDataIndex].value : '';
        return (
          <div className="input" key={index}>
            <span className="input--name">{value.name}</span>
            <input
              className="input--value"
              defaultValue={inputData}
              onChange={(e) => updateValue(e.currentTarget.value, value.id)}
            />
          </div>
        );
      })}
      <button onClick={() => getModel()}>Получить в консоли модель</button>
    </>
  );
};

function App() {
  return <ParamEditor model={model} params={params} />;
}

export default App;
