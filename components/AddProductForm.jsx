"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const AddProductForm = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste product URL (Amazon, Walmart, etc.)"
          className="h-12 text-base"
          disabled={loading}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 h-10 sm:h-12 px-8 cursor-pointer"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Track Price"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
