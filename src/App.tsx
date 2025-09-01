import Form from "./Form";

function App() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <Form
          formName="Vat and SC"
          vatPer={1.12}
          scPer={0.05}
          color="#FFFBE9"
        />
        <Form formName="Vat" vatPer={1.12} scPer={0} color="#FFFBE9" />
        <Form formName="Without Vat" vatPer={1} scPer={0.05} color="#FFFBE9" />
        <Form
          formName="Without Vat and SC"
          vatPer={1}
          scPer={0}
          color="#FFFBE9"
        />
      </div>
    </div>
  );
}

export default App;
