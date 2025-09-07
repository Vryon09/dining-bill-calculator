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
  const [withoutServiceCharge, setWithoutServiceCharge] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vatAndScDiscount, setVatAndScDiscount] = useState(0);

  function handleDiscount() {
    if (pax === 0) return alert("Please include number of pax.");

    const amountPerPerson = grossAmount / pax;
    const baseAmountExcludingVAT = amountPerPerson / vatPer;
    const discountedAmountPerPerson =
      baseAmountExcludingVAT - baseAmountExcludingVAT * 0.2;

    const totalDiscountedGroupAmount = discountedAmountPerPerson * discountNum;
    setVatAndScDiscount(totalDiscountedGroupAmount);
    const totalNonDiscountedGroupAmount = amountPerPerson * (pax - discountNum);

    const totalBeforeServiceCharge =
      totalDiscountedGroupAmount + totalNonDiscountedGroupAmount;
    setWithoutServiceCharge(totalBeforeServiceCharge);

    const serviceChargeAmount = (grossAmount / vatPer) * scPer;
    setServiceCharge(serviceChargeAmount);

    const finalBillAmount = totalBeforeServiceCharge + serviceChargeAmount;
    setTotalAmount(finalBillAmount);

    console.log(totalDiscountedGroupAmount);
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

      {(formName === "Vat and SC" || formName === "Without Vat") && (
        <>
          <p className="flex justify-between">
            <span>Amount without SC: </span>{" "}
            <span> {grossAmount.toFixed(2)} </span>
          </p>
          <p className="flex justify-between">
            <span>Regular Payment: </span>
            <span>
              {" "}
              {(withoutServiceCharge - vatAndScDiscount).toFixed(2)}{" "}
            </span>
          </p>
        </>
      )}

      {formName !== "Without Vat and SC" && (
        <p className="flex justify-between">
          <span>Net of Discount: </span>
          <span>{vatAndScDiscount.toFixed(2)}</span>
        </p>
      )}

      <p className="flex justify-between">
        <span>Amount: </span> <span> {withoutServiceCharge.toFixed(2)} </span>
      </p>

      {formName === "Without Vat and SC" && (
        <p className="flex justify-between">
          <span>Discount Amount: </span>{" "}
          <span> {(grossAmount - totalAmount).toFixed(2)} </span>
        </p>
      )}

      {(formName === "Vat and SC" || formName === "Without Vat") && (
        <p className="flex justify-between">
          <span>Service Charge: </span>{" "}
          <span> {serviceCharge.toFixed(2)} </span>
        </p>
      )}
      <p className="flex justify-between text-lg font-semibold">
        <span>Total Amount: </span> <span> {totalAmount.toFixed(2)} </span>
      </p>
    </form>
  );
}

export default Form;
