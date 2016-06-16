SELECT *
FROM pm.d_file_type a, pm.d_login b
WHERE a.create_login_id = b.login_id AND a.project_id = 2;

SELECT
  a.*,
  b.*,
  ifnull(c.count, 0) AS count
FROM (SELECT *
      FROM pm.d_file_type
      WHERE project_id = 2) a
  LEFT JOIN pm.d_login b ON a.create_login_id = b.login_id
  LEFT JOIN (SELECT
               ft_id,
               count(1) AS count
             FROM pm.d_file
             WHERE project_id = 2
             GROUP BY ft_id) c ON a.ft_id = c.ft_id;

SELECT
  ft_id,
  count(1)
FROM pm.d_file
WHERE project_id = 2
GROUP BY ft_id;

delete from d_login where login_no = 'songyw';
