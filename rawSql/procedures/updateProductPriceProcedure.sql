
CREATE OR REPLACE FUNCTION updateProductPrice(
    productId TEXT,
    newPrice DOUBLE PRECISION,
    updatedBy TEXT
)
    RETURNS VOID AS $$
DECLARE
    oldPriceVar DOUBLE PRECISION;
BEGIN
    SELECT price INTO oldPriceVar FROM "Product" WHERE id = productId;

    IF oldPriceVar IS NULL THEN
        RAISE EXCEPTION 'Product not found';
    END IF;

    -- Update the product's price
    UPDATE "Product" SET price = newPrice, "updatedAt" = NOW(), "updatedBy" = updatedBy WHERE id = productId;

    -- Insert the change into the PriceHistory table
    INSERT INTO "PriceHistory"("id", "productId", "oldPrice", "newPrice", "changeDate", "createdAt", "updatedAt", "updatedBy")
    VALUES(uuid_generate_v4(), productId, oldPriceVar, newPrice, NOW(), NOW(), NOW(), updatedBy);

END;
$$ LANGUAGE plpgsql;

-- SELECT UpdateProductPrice('72ca372a-b1f7-4c8e-9e13-753e4d4d1816', 1000, 'demoForLesson');

