# 架構分層

## 依賴方向

![Dependency Direction](https://github.com/user-attachments/assets/35e7cedb-de3e-443d-903e-245f7f7c05e9)

理想上的依賴方向只有實線箭頭，但實務上會有一些額外的相依性則以虛線箭頭呈現。


## PresentationLayer (表示層)

### 說明

負責處理使用者的輸入輸出(控制器)、建構整個 Web Server 所需的依賴元件、系統驗證及安全性設定，例如 Cookie、Jwtoken、HSTS、CORS 等。

### Contract

只放置 HttpRequest 的模型

## ApplicationLayer (應用層)

### 說明

主要運行系統的業務邏輯，採用命令查詢責任分離(CQRS)模式，進行架構分層。

## 資料夾結構

### UseCase (使用情境)

一個 HttpRequest 就定義一個 usecase，並依照控制器的命名將業務邏輯用CQRS進行分類

* Command (命令)

執行會有 SideEffect 的 Handler，例如有更新或是寫入的業務邏輯。

* Query (查詢)

執行單純進行取得資料的 Handler。

### Service (服務)

放置應用層共用的業務或是方法。

### Persistance (持久化)

放置可以把領域模型進行持久化或是取得領域模型的方法。

### EventHandler (事件處理)

放置事件的訂閱者，當應用層發布事件時，訂閱者可以負責處理這些事件。

## InfraLayer (基礎層)

### 說明

放置資料庫模型，處理領域模型以及資料庫模型的轉換，將領域模型持久化。  
>!!注意!! 此層不進行任何的業務邏輯處理，只進行持久化作業。

## 資料夾結構

### Repository (倉儲)

負責將領域模型持久化或是取得領域模型。

### Context

放置資料庫模型。

## DomainLayer (領域層)

### 說明

建構領域模型，支持整個系統最核心的業務，依照業務邏輯劃分實體邊界。

## 資料夾結構

### Entity (實體)

領域模型中，以ID來辨識該實體的唯一性。  
例如電影院座位都有編號，只要是不同的編號，就代表是兩個不同的實體。

### Root/Aggregate (聚合根)

屬於Entity的一種，但此為領域模型的邊界，聚合根內部可能包含許多的Entity及ValueObject，但只能藉由聚合根提供的方法來操作領域模型，並進行持久化時，需以一個聚合根為單位進行持久化，來保持領域模型的完整性。

### ValueObject (值物件)

領域模型中，以物件本身的屬性來判斷唯一性。  
例如兩張鈔票，只要他們的幣值跟金額都相同，就可以代表是相同的物件。
