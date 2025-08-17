const NameComponent = () => {
    return (
        <>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <div className="w-full bg-black text-white py-6 shadow-md border-b border-gray-800">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wide">
                Welcome to my Portfolio
            </h1>
            <p className="mt-2 text-center text-lg md:text-xl text-gray-300">
                Where I show you my life in terms of my favorite data structure:{" "}
                <span className="text-indigo-400 font-semibold">Graphs</span>
            </p>
        </div>
        </>
    );
};

export default NameComponent;