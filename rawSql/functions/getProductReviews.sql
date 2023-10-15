CREATE OR REPLACE FUNCTION get_product_reviews(product_id TEXT) RETURNS TABLE (
                                                                                  user_id TEXT, username TEXT, rating INT, comment TEXT
                                                                              ) AS $$
BEGIN
    RETURN QUERY
        SELECT r."userId", u."username", r."rating", r."comment"
        FROM "Review" r
                 JOIN "User" u ON r."userId" = u.id
        WHERE r."productId" = product_id;
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM get_product_reviews('6ebcfba2-cbd7-4acd-a3f3-01ee81a483d5');

