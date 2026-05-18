import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: ["markdown"],
    });

    // For firecrawl v2, we'll parse the markdown content to extract product info
    const markdown = result.markdown || result.content || "";

    // Extract product data from the HTML/markdown
    const extractedData = parseProductData(markdown);

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}

// Helper function to parse product data from markdown
function parseProductData(content) {
  // Extract product name from heading or title
  const nameMatch = content.match(/(?:^|\n)#+\s*([^\n]+)/);
  const productName = nameMatch ? nameMatch[1].trim() : "Unknown Product";

  // Extract price (common patterns: ₹1,234.56, $123.45, etc)
  const priceMatch = content.match(/[₹\$€£]\s*([\d,]+\.?\d*)/);
  const currentPrice = priceMatch
    ? parseFloat(priceMatch[1].replace(/,/g, ""))
    : 0;

  // Determine currency
  const currencyMatch = content.match(/[₹\$€£]/);
  const currencyMap = { "₹": "INR", $: "USD", "€": "EUR", "£": "GBP" };
  const currencyCode = currencyMatch ? currencyMap[currencyMatch[0]] : "INR";

  // Extract image URL
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const productImageUrl = imageMatch ? imageMatch[1] : "";

  return {
    productName,
    currentPrice,
    currencyCode,
    productImageUrl,
  };
}
