const Favourites = () => {
    const items = [
      {
        title: "Honda vezel 2014",
        author: "Rahul Sha",
        price: "Lkr.1050000",
        image: "/path/to/image1.jpg", // Replace with the image path
      },
      {
        title: "Toyota premio 2008",
        author: "Stieg Larsson",
        price: "Lkr.750000",
        image: "/path/to/image2.jpg",
      },
      {
        title: "Honda civic 2018",
        author: "Melinda Jazz",
        price: "Lkr.1200000",
        image: "/path/to/image3.jpg",
      },
      {
        title: "Mitsubishi lancer evo x",
        author: "Umberto Eco",
        price: "Lkr.1600000",
        image: "/path/to/image4.jpg",
      },
    ];
  
    return (
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Purchasing history</h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              Sort by:
            </label>
            <select
              id="sort"
              className="text-sm rounded-md border-gray-300 focus:ring-[#2b241a] focus:border-[#2b241a] shadow-sm"
            >
              <option>Newest first</option>
              <option>Oldest first</option>
            </select>
          </div>
        </div>
  
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {/* Image */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                {/* Item details */}
                <div>
                  <h2 className="text-lg font-medium text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-600">By {item.author}</p>
                </div>
              </div>
  
              {/* Price and Button */}
              <div className="flex items-center space-x-6">
                <span className="text-lg font-semibold text-gray-800">{item.price}</span>
                <button className="px-4 py-2 text-sm bg-[#2b241a] text-white rounded-md hover:bg-[#2b241a]/90">
                  View Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Favourites;
  