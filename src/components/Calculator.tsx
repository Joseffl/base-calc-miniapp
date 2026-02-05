"use client";

import { useState, useCallback } from "react";

interface HistoryItem {
  expression: string;
  result: string;
  timestamp: Date;
}

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
  }, []);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? digit : display + digit);
      }
    },
    [display, waitingForOperand]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const inputOperator = useCallback(
    (operator: string) => {
      const displayValue = parseFloat(display);
      const operatorSymbol =
        operator === "*" ? "×" : operator === "/" ? "÷" : operator;

      if (expression && !waitingForOperand) {
        // Chain calculations
        const fullExpression = expression + display;
        try {
          const result = eval(fullExpression);
          setDisplay(String(result));
          setExpression(String(result) + operator);
        } catch {
          setDisplay("Error");
          setExpression("");
        }
      } else {
        setExpression(
          (waitingForOperand ? expression.slice(0, -1) : display) + operator
        );
      }
      setWaitingForOperand(true);
    },
    [display, expression, waitingForOperand]
  );

  const calculate = useCallback(() => {
    if (!expression) return;

    const fullExpression = expression + display;
    try {
      const result = eval(fullExpression);
      const resultStr = String(result);

      // Format expression for history display
      const displayExpression = fullExpression
        .replace(/\*/g, "×")
        .replace(/\//g, "÷");

      // Add to history
      setHistory((prev) => [
        {
          expression: displayExpression,
          result: resultStr,
          timestamp: new Date(),
        },
        ...prev.slice(0, 49), // Keep last 50 entries
      ]);

      setDisplay(resultStr);
      setExpression("");
      setWaitingForOperand(true);
    } catch {
      setDisplay("Error");
      setExpression("");
    }
  }, [display, expression]);

  const toggleSign = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  }, [display]);

  const inputPercent = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const useHistoryResult = useCallback((result: string) => {
    setDisplay(result);
    setExpression("");
    setWaitingForOperand(false);
    setShowHistory(false);
  }, []);

  const buttons = [
    { label: "C", action: clearAll, className: "bg-zinc-600" },
    { label: "±", action: toggleSign, className: "bg-zinc-600" },
    { label: "%", action: inputPercent, className: "bg-zinc-600" },
    { label: "÷", action: () => inputOperator("/"), className: "bg-blue-500" },
    { label: "7", action: () => inputDigit("7"), className: "bg-zinc-700" },
    { label: "8", action: () => inputDigit("8"), className: "bg-zinc-700" },
    { label: "9", action: () => inputDigit("9"), className: "bg-zinc-700" },
    { label: "×", action: () => inputOperator("*"), className: "bg-blue-500" },
    { label: "4", action: () => inputDigit("4"), className: "bg-zinc-700" },
    { label: "5", action: () => inputDigit("5"), className: "bg-zinc-700" },
    { label: "6", action: () => inputDigit("6"), className: "bg-zinc-700" },
    { label: "-", action: () => inputOperator("-"), className: "bg-blue-500" },
    { label: "1", action: () => inputDigit("1"), className: "bg-zinc-700" },
    { label: "2", action: () => inputDigit("2"), className: "bg-zinc-700" },
    { label: "3", action: () => inputDigit("3"), className: "bg-zinc-700" },
    { label: "+", action: () => inputOperator("+"), className: "bg-blue-500" },
    {
      label: "0",
      action: () => inputDigit("0"),
      className: "bg-zinc-700 col-span-2",
    },
    { label: ".", action: inputDecimal, className: "bg-zinc-700" },
    { label: "=", action: calculate, className: "bg-blue-500" },
  ];

  // Format the current expression for display
  const displayExpression = expression
    .replace(/\*/g, "×")
    .replace(/\//g, "÷");

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header with history toggle */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-xl font-bold text-white">Calculator</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          History
        </button>
      </div>

      {showHistory ? (
        /* History Panel */
        <div className="bg-zinc-800 rounded-2xl p-4 min-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">History</h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Clear All
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">No history yet</p>
          ) : (
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              {history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => useHistoryResult(item.result)}
                  className="w-full text-left p-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
                >
                  <div className="text-zinc-400 text-sm">{item.expression}</div>
                  <div className="text-white text-lg font-semibold">
                    = {item.result}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Calculator Panel */
        <div className="bg-zinc-800 rounded-2xl p-4">
          {/* Display */}
          <div className="bg-zinc-900 rounded-xl p-4 mb-4">
            <div className="text-zinc-400 text-sm h-6 text-right overflow-hidden">
              {displayExpression}
            </div>
            <div className="text-white text-4xl font-light text-right overflow-hidden">
              {display.length > 12 ? Number(display).toExponential(6) : display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                className={`${btn.className} h-16 rounded-xl text-2xl font-medium text-white
                  active:opacity-70 transition-opacity select-none touch-manipulation`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
