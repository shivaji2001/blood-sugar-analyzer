import React, { useState, useRef, useEffect } from "react";
import "./MultiSelectAutocomplete.css";

const allOptions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Mango",
  "Orange",
  "Pineapple",
];

export default function MultiSelectAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(allOptions);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const filtered = allOptions.filter(
      (item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedItems.includes(item)
    );
    setFilteredOptions(filtered);
  }, [inputValue, selectedItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addItem = (item) => {
    if (item && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setInputValue("");
    setShowDropdown(false);
  };

  const removeItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addItem(inputValue.trim());
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      removeItem(selectedItems[selectedItems.length - 1]);
    }
  };

  return (
    <div className="multi-select-container" ref={containerRef}>
      <div
        className="multi-select-input-area"
        onClick={() => setShowDropdown(true)}
      >
        {selectedItems.map((item) => (
          <div className="multi-select-tag" key={item}>
            {item}
            <button
              aria-label={`Remove ${item}`}
              className="multi-select-tag-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item);
              }}
            >
              ×
            </button>
          </div>
        ))}

        <input
          type="text"
          className="multi-select-input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type or add..."
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
      </div>

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="multi-select-dropdown" role="listbox">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="multi-select-option"
              onClick={() => addItem(option)}
              onMouseDown={(e) => e.preventDefault()} // prevent input blur
              role="option"
              tabIndex={-1}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
