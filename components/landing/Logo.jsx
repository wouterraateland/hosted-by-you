export default function Logo() {
  return (
    <div className="flex items-center space-x-4 text-left">
      <div className="shadow-sm w-12 h-16 mr-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600">
        <div className="shadow-md w-12 h-12 my-2 mx-4 -mr-4 flex items-center justify-center rounded-xl font-black text-4xl bg-white">
          E
        </div>
      </div>
      <h1 className="font-black text-4xl leading-none dark:text-gray-100">
        Hosted
        <br />
        by You
      </h1>
    </div>
  );
}
