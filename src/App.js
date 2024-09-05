import PublicLayout from "./components/layouts/PublicLayout";

function App() {
  return (
    <PublicLayout>
      <main className="container flex gap-6 pt-8 h-[570px]">
        <div className="w-[410px] bg-white rounded-lg"></div>

        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">Basic Information</h3>
            <p className="text-sm text-[#718096]">Please provide your basic information below to help us serve you better</p>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1">Name</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-2">
                <p>Name</p>
                <p>Name</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  )
}

export default App;
