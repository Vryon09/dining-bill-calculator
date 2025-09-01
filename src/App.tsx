import Form from "./Form";

function App() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <Form
          formName="Vat and SC"
          vatPer={1.12}
          scPer={0.05}
          color="#f5f5f5"
        />
        <Form formName="Vat" vatPer={1.12} scPer={0} color="#f5f5f5" />
        <Form
          formName="Without Vat and SC"
          vatPer={1}
          scPer={0}
          color="#f5f5f5"
        />
        <Form formName="Without Vat" vatPer={1} scPer={0.05} color="#f5f5f5" />
      </div>
      <div className="flex justify-center py-4">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Vryon and Eyey
        </p>
      </div>
    </div>
  );
}

export default App;
