CREATE OR REPLACE  FUNCTION get_users_with_processed_orders() RETURNS TABLE (user_id TEXT, username TEXT) AS $$
BEGIN
    RETURN QUERY
        SELECT DISTINCT u.id, u.username
        FROM "User" u
                 JOIN "Order" o ON u.id = o."userId"
        WHERE o."statusId" IN (SELECT id FROM "OrderStatus" WHERE name = 'Processed');
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM get_users_with_processed_orders();