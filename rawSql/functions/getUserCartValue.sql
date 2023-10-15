CREATE OR REPLACE FUNCTION get_cart_value(user_id TEXT) RETURNS FLOAT AS $$
DECLARE
    total FLOAT;
BEGIN
    SELECT SUM(p.price * c.quantity) INTO total
    FROM "Cart" c
             JOIN "Product" p ON c."productId" = p.id
    WHERE c."userId" = user_id;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_cart_value('d0bf87bb-86f2-4925-8bf7-21340f40d382');
