use local;

INSERT into admins (username, password) values (
  "admin",
  "$2a$10$hSagqZXkqTFnvYUIP1kZ4OVhp0HMaAhqGW.4hNfDTLFmfgD2c4D0q"
);

INSERT into roles (role, description) values (
  'admin', 'Application administrator. Full privileges'
), (
  'ambassador', 'Application ambassador. Can create basic users'
), (
  'user', 'Freeradius user. Can authenticate through radius server'
);

INSERT into user_roles (role, userId) values ('admin', 1);

INSERT into ssids (name, vendor) values (
  'Meraki Preventa', 'Meraki'
), (
  'WiFi Contatel', 'Meraki'
), (
  'WiFi vWLC', 'Cisco'
);