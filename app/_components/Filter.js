const filterButtons = [
  { label: `All cabins`, value: "all" },
  { label: `1\u20133 guests`, value: "small" },
  { label: `4\u20137 guests`, value: "medium" },
  { label: `8\u201312 guests`, value: "large" },
];

export default function Filter() {
  return (
    <div className='border border-primary-700'>
      {filterButtons.map((button) => (
        <button className={`px-5 py-2 hover:bg-primary-700 cursor-pointer`} key={button.value}>
          {button.label}
        </button>
      ))}
    </div>
  );
}
