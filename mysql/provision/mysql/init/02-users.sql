# create root user and grant rights
CREATE USER 'fmesasc'@'%' IDENTIFIED BY 'fmesascPass1234/';
GRANT ALL PRIVILEGES ON *.* TO 'fmesasc'@'%' IDENTIFIED BY 'fmesascPass1234/';

FLUSH PRIVILEGES;

