export const Input = ({ label, type, id, placeholder, onChange, value, required }) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
                <label htmlFor={id} className="font-semibold text-sm text-gray-600 pb-1 block"
                >
                    {label}
                </label>
            </div>
            <input
                id={id}
                type={type}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                required={required}
            />
        </div>
    )
}
