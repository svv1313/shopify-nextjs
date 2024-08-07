import { IOptionValue } from "../../types/products";

interface IProps {
  name: string;
  values: IOptionValue[];
  selectedOption: { [key: string]: IOptionValue };
}

export const ProductOption = ({ name, values, selectedOption }: IProps) => {
  return (
    <fieldset>
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map((value) => {
          const id = `${name}-${value.id}`;
          const checked = selectedOption[name].id === value.id;
          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${name}`}
                value={value.id}
                checked={checked}
              />
              <div
                className={`p-2 my-3 text-lg rounded-full block cursor-pointer mr-3 ${
                  checked
                    ? "text-white bg-gray-900"
                    : "text-gray-900 bg-gray-200"
                }`}
              >
                <span className='px-2'>{value.name}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
