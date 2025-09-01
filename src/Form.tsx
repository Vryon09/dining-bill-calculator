import { useState } from "react";

function Form({
  formName,
  vatPer,
  scPer,
  color = "white",
}: {
  formName: string;
  vatPer: number;
  scPer: number;
  color: string;
}) {
  const [grossAmount, setGrossAmount] = useState(0);
  const [pax, setPax] = useState(0);
  const [discountNum, setDiscountNum] = useState(0);
  const [woSc, setWoSc] = useState(0);
  const [sc, setSc] = useState(0);
  const [final, setFinal] = useState(0);

  function handleDiscount() {
    if (pax === 0) return alert("Please include number of pax.");

    const divide = grossAmount / pax;
    const vat = divide / vatPer;
    const twentyP = vat - vat * 0.2;
    const yesRes = twentyP * discountNum;
    const noDisNum = pax - discountNum;
    const noRes = divide * noDisNum;
    const sumYesNo = yesRes + noRes;
    setWoSc(sumYesNo);
    const serviceCharge = (grossAmount / vatPer) * scPer;
    setSc(serviceCharge);
    const finalResult = sumYesNo + serviceCharge;
    setFinal(finalResult);
  }

  return (
    <form
      style={{
        backgroundColor: color,
      }}
      className="rounded-2xl px-6 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleDiscount();
      }}
    >
      <p className="mb-2 text-xl font-bold">{formName}</p>

      <div className="mb-4 flex flex-col gap-2 rounded-2xl">
        <div className="flex items-center">
          <label className="flex-1">Gross Amount: </label>
          <input
            className="w-40 rounded-xl border-1 px-2 outline-0"
            type="text"
            value={grossAmount}
            onChange={(e) => {
              if (isNaN(+e.target.value)) return;
              setGrossAmount(+e.target.value);
            }}
          />
        </div>

        <div className="flex items-center">
          <label className="flex-1">Pax: </label>
          <input
            className="w-40 rounded-xl border-1 px-2 outline-0"
            type="text"
            value={pax}
            onChange={(e) => {
              if (isNaN(+e.target.value)) return;

              setPax(+e.target.value);
            }}
          />
        </div>

        <div className="flex items-center">
          <label className="flex-1">Discount Num: </label>
          <input
            className="w-40 rounded-xl border-1 px-2 outline-0"
            type="text"
            value={discountNum}
            onChange={(e) => {
              if (isNaN(+e.target.value)) return;

              setDiscountNum(+e.target.value);
            }}
          />
        </div>
      </div>

      <button className="mb-4 w-full cursor-pointer rounded-2xl bg-black p-2 text-white">
        Submit
      </button>

      <p className="flex justify-between">
        <span>Without Service Charge: </span> <span> {woSc.toFixed(2)} </span>
      </p>
      <p className="flex justify-between">
        <span>Service Charge: </span> <span> {sc.toFixed(2)} </span>
      </p>
      <p className="flex justify-between">
        <span>Amount: </span> <span> {final.toFixed(2)} </span>
      </p>
    </form>
  );
}

export default Form;
