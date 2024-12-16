CREATE DATABASE IF NOT EXISTS `machikan_number_db`;

USE `machikan_number_db`;

-- 依存関係の確認を無効化
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_to_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS shop_to_card_numbers;
DROP TABLE IF EXISTS event_to_shops;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS events;
-- 依存関係の確認を有効化
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE events (
    event_id CHAR(36) PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_at DATETIME,
    end_at DATETIME,
    invite_key CHAR(36)
);

CREATE TABLE shops (
    shop_id CHAR(36) PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_at DATETIME,
    end_at DATETIME,
    user_key CHAR(36) NOT NULL
);

CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id CHAR(36),
    name TEXT NOT NULL,
    price INT DEFAULT 0,
    time INT DEFAULT 0,
    FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE orders (
    order_id CHAR(36) PRIMARY KEY,
    shop_id CHAR(36),
    card_number TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE order_to_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id CHAR(36),
    item_id INT,
    count INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

CREATE TABLE event_to_shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id CHAR(36),
    shop_id CHAR(36),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);


-- CREATE TABLE events (
--     event_id CHAR(36) PRIMARY KEY,
--     name TEXT NOT NULL,
--     description TEXT,
--     start_at DATETIME,
--     end_at DATETIME,
--     invite_key CHAR(36) NOT NULL
-- );

-- CREATE TABLE shops (
--     shop_id CHAR(36) PRIMARY KEY,
--     name TEXT NOT NULL,
--     description TEXT,
--     start_at DATETIME,
--     end_at DATETIME,
--     user_key CHAR(36) NOT NULL
-- );

-- CREATE TABLE event_to_shops (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     event_id CHAR(36) NOT NULL,
--     shop_id CHAR(36) NOT NULL,
--     -- 外部キー制約
--     FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
--     FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
-- );

-- CREATE TABLE items (
--     item_id CHAR(36) PRIMARY KEY,
--     shop_id CHAR(36) NOT NULL,
--     name TEXT NOT NULL,
--     price SMALLINT NOT NULL,
--     time FLOAT,
--     -- 外部キー制約
--     FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
-- );

-- CREATE TABLE orders (
--     order_id CHAR(36) PRIMARY KEY,
--     shop_id CHAR(36) NOT NULL,
--     card_number SMALLINT NOT NULL,
--     created_at DATETIME NOT NULL,
--     -- 外部キー制約
--     FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
-- );

-- CREATE TABLE order_to_items (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     order_id CHAR(36),
--     item_id CHAR(36),
--     count SMALLINT NOT NULL,
--     -- 複合主キー
--     -- PRIMARY KEY (order_id, item_id),
--     -- 外部キー制約
--     FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
--     FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
-- );

-- CREATE TABLE shop_to_card_numbers (
--     shop_id CHAR(36) NOT NULL,
--     card_number SMALLINT NOT NULL,
--     is_used BOOLEAN NOT NULL DEFAULT FALSE,
--     last_assigned_at DATETIME NOT NULL,
--     -- 複合主キー
--     PRIMARY KEY (shop_id, card_number),
--     -- 外部キー制約
--     FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
-- );

-- インデックスの作成
CREATE INDEX idx_event_to_shops_event_id ON event_to_shops(event_id);
CREATE INDEX idx_event_to_shops_shop_id ON event_to_shops(shop_id);
CREATE INDEX idx_items_shop_id ON items(shop_id);
CREATE INDEX idx_orders_shop_id ON orders(shop_id);
CREATE INDEX idx_order_to_items_order_id ON order_to_items(order_id);
CREATE INDEX idx_order_to_items_item_id ON order_to_items(item_id);
CREATE INDEX idx_shop_to_card_numbers_shop_id ON shop_to_card_numbers(shop_id);

-- データの挿入
-- INSERT INTO events (event_id, name, description, start_at, end_at, invite_key, user_key) VALUES
--     ('00000000-0000-0000-0000-000000000000', 'イベント1', 'イベント1の説明', '2021-01-01 00:00:00', '2021-01-02 00:00:00', '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000'),
--     ('00000000-0000-0000-0000-000000000001', 'イベント2', 'イベント2の説明', '2021-01-01 00:00:00', '2021-01-02 00:00:00', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
--     ('00000000-0000-0000-0000-000000000002', 'イベント3', 'イベント3の説明', '2021-01-01 00:00:00', '2021-01-02 00:00:00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');

-- INSERT INTO shops (shop_id, name, description, start_at, end_at, user_key) VALUES
--     ('00000000-0000-0000-0000-000000000000', '店舗1', '店舗1の説明', '2021-01-01 00:00:00', '2021-01-02 00:00:00', '00000000-0000-0000-0000-000000000000'),
--     ('00000000-0000-0000-0000-000000000001', '店舗2', '店舗2の説明', '2021-01-01 00:00:00', '2021-01-02 00:00:00', '00000000-0000-0000-0000-000000000001'),
--     ('00000000-0000-0000-0000-000000000002', '店舗3', '店舗3の説明', '2021-01-01 00:00:00', '2021-01-02 00:00:00', '00000000-0000-0000-0000-000000000002');

-- INSERT INTO event_to_shops (event_id, shop_id) VALUES
--     ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000'),
--     ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001'),
--     ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
--     ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
--     ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');

-- INSERT INTO items (item_id, shop_id, name, price, time) VALUES
--     ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', '商品1', 100, 1.0),
--     ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', '商品2', 200, 2.0),
--     ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '商品3', 300, 3.0),
--     ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '商品4', 400, 4.0),
--     ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', '商品5', 500, 5.0),
--     ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', '商品6', 600, 6.0);

-- INSERT INTO orders (order_id, shop_id, card_number, created_at) VALUES
--     ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 1, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 2, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 3, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 4, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 5, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 6, '2021-01-01 00:00:00');

-- INSERT INTO order_to_items (order_id, item_id, count) VALUES
--     ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 1),
--     ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001', 2),
--     ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 3),
--     ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 4),
--     ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 5),
--     ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 6);

-- INSERT INTO shop_to_card_numbers (shop_id, card_number, last_assigned_at) VALUES
--     ('00000000-0000-0000-0000-000000000000', 1, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000000', 2, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000001', 3, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000001', 4, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000002', 5, '2021-01-01 00:00:00'),
--     ('00000000-0000-0000-0000-000000000002', 6, '2021-01-01 00:00:00');

