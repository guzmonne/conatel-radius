use 'radius';

INSERT INTO radcheck VALUES
  (NULL, 'test', 'Cleartext-Password', ':=', 'test'),
  (NULL, 'user', 'MD5-Password', ':=', MD5('pass')),
  (NULL, 'user', 'Expiration', ':=', 'Jul 31 2016 00:00:00');

INSERT INTO nas VALUES
  (NULL, '0.0.0.0/0', 'testing', NULL, NULL, 'testing321', NULL, NULL, NULL);