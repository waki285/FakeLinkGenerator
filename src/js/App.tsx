import React, { useCallback, useEffect, useRef, useState } from "react";
import { MobileView, BrowserView } from "react-device-detect";

export default function App() {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [underline, setUnderline] = useState(false);
  const [fakeUrl, setFakeUrl] = useState("No URL Generated");
  const copyRef = useRef<HTMLButtonElement>(null);
  const gen = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      const og = `(${target})`;
      try {
        const url = new URL(`https://${source}`);
        const fake = `${underline ? "__" : ""}[https]${og}[://]${og}[${
          url.hostname
        }]${og}[${url.pathname + url.search + url.hash}]${og}${
          underline ? "__" : ""
        }`;
        setFakeUrl(fake);
      } catch (e) {
        alert("Invalid Fake URL");
        return;
      }
    },
    [source, target]
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <main className="max-w-3xl mx-2 font-sans my-4">
        <h1 className="text-center text-blue-600 font-bold text-3xl mb-8">
          Discord Fake Link Generator
        </h1>
        <label
          htmlFor="source"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Fake Link
        </label>
        <div className="flex">
          <span className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l">
            https://
          </span>
          <input
            id="source"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="source"
            type="text"
            placeholder="discord.gift/..."
            onChange={(e) => {
              setSource(e.target.value);
            }}
            value={source}
          />
        </div>
        <label
          htmlFor="target"
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
        >
          Actual Link
        </label>
        <input
          id="target"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="target"
          type="text"
          placeholder="https://discord.com/..."
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
        />
        <div className="flex mt-4 cursor-pointer">
          <input
            id="underline"
            type="checkbox"
            className="h-5 w-5 text-blue-600"
            checked={underline}
            onChange={(e) => {
              setUnderline(e.target.checked);
            }}
          />
          <label
            htmlFor="underline"
            className="ml-2 block text-gray-700 text-sm font-bold mb-2"
          >
            Underline
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={gen}
        >
          Generate
        </button>
        <label
          htmlFor="fakeUrl"
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
        >
          Fake URL
        </label>
        <div className="flex">
          <input
            id="fakeUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="fakeUrl"
            type="text"
            placeholder="No URL Generated"
            value={fakeUrl}
            readOnly
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigator.clipboard.writeText(fakeUrl);
              copyRef?.current?.animate(
                [
                  { backgroundColor: "#57F287" },
                  { backgroundColor: "rgb(29 78 216)" },
                ],
                {
                  duration: 500,
                  easing: "ease-in-out",
                }
              );
            }}
            ref={copyRef}
          >
            Copy
          </button>
        </div>
      </main>
      <footer>
        <div className="text-center text-gray-500 text-xs flex flex-col items-center">
          <span>
            Created by{" "}
            <a
              href="https://twitter.com/suzuneu_discord"
              className="text-blue-500 hover:text-blue-600 visited:text-purple-600"
            >
              すずねーう
            </a>
          </span>
          <span>
            GitHub:{" "}
            <a
              href="https://github.com/waki285/FakeLinkGenerator"
              className="text-blue-500 hover:text-blue-600 visited:text-purple-600"
            >
              waki285/FakeLinkGenerator
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
