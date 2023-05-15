1. [-] пользователь открывает заказ ( переходит по ссылке 'http://localhost:3000/feed/64527d0a45c6f2001be708ac')
1. [-] FeedPage отрисовывает /feed/idFeed
1. [-] получаем список заказов из store через useSelector orders: store.wsReducer.message.orders
1. [-] с помощью useParams я достаю 64527d0a45c6f2001be708ac из ссылки
1. [-] пройтись по всем заказам и найти соответствующий идентефикатору заказ  64527d0a45c6f2001be708ac (order._id)
1. [-] так как в заказе есть не все данные (счетик , цена ингредиента, картинка ) 
1. [-] берем из store все ингредиенты ingredients: store.ingredients.ingredients
1. [-] в order.ingredients хранятся идентификаторы ингредиентов
1. [-] для каждого идентификатора из order.ingredients я ищу соответствующий ингредиент в ingredients: store.ingredients.ingredients
1. [-] из этого ингредиента я получаю недостающую инфо
1. [-] я готова отрисовывать order
1. [-] Goal: открыть заказ  в новом окне и отрисовать 




найти на странице FeedPage карточку FeedCard
FeedPage говорит FeedCard скрыть элемент через пропс hide
FeedCard смотрит в пропсы и определяет, нужно ли скрывать элемент 
в карточке нужно скрыть элемент со статусом 
скрыть элемент в карточке для всех заказов 


'64538fe045c6f2001be70c83', ingredients: Array(3), status: 'done', name: 'Space краторный бургер', createdAt: '2023-05-04T10:58:40.663Z', …}
1
: 
{_id: '64538fc145c6f2001be70c81', ingredients: Array(3), status: 'done', name: 'Space краторный бургер', createdAt: '2023-05-04T10:58:09.847Z', …}
2
: 
{_id: '64538fae45c6f2001be70c7f', ingredients: Array(3), status: 'done', name: 'Метеоритный флюоресцентный бургер', createdAt: '2023-05-04T10:57:50.621Z', …}
3
: 
{_id: '64538f8a45c6f2001be70c7d', ingredients: Array(3), status: 'done', name: 'Space краторный бургер', createdAt: '2023-05-04T10:57:14.162Z', …}
4
: 
{_id: '64538f7245c6f2001be70c7b', ingredients: Array(3), status: 'done', name: 'Space краторный бургер', createdAt: '2023-05-04T10:56:50.857Z', …}
5
: 
{_id: '64538f5c45c6f2001be70c79', ingredients: Array(3), status: 'done', name: 'Space краторный бургер', createdAt: '2023-05-04T10:56:28.657Z', …}
6
: 
{_id: '64538f0545c6f2001be70c77', ingredients: Array(5), status: 'done', name: 'Минеральный астероидный флюоресцентный экзо-плантаго бургер', createdAt: '2023-05-04T10:55:01.433Z', …}
7
: 
{_id: '64538eeb45c6f2001be70c75', ingredients: Array(3), status: 'done', name: 'Space флюоресцентный бургер', createdAt: '2023-05-04T10:54:35.403Z', …}
8
: 
{_id: '64538d5f45c6f2001be70c69', ingredients: Array(5), status: 'done', name: 'Space антарианский флюоресцентный бургер', createdAt: '2023-05-04T10:47:59.201Z', …}
9
: 
{_id: '64538d2d45c6f2001be70c67', ingredients: Array(3), status: 'done', name: 'Space краторный бургер', createdAt: '2023-05-04T10:47:09.808Z', …}
10
: 
{_id: '64538b3345c6f2001be70c64', ingredients: Array(6), status: 'done', name: 'Астероидный экзо-плантаго био-марсианский антарианский краторный бургер', createdAt: '2023-05-04T10:38:43.532Z', …}
11
: 
{_id: '6453893945c6f2001be70c5a', ingredients: Array(2), status: 'done', name: 'Флюоресцентный бургер', createdAt: '2023-05-04T10:30:17.359Z', …}
12
: 
{_id: '6453864145c6f2001be70c3f', ingredients: Array(6), status: 'done', name: 'Space антарианский флюоресцентный бургер', createdAt: '2023-05-04T10:17:37.350Z', …}
13
: 
{_id: '64537eeb45c6f2001be70c36', ingredients: Array(2), status: 'done', name: 'Краторный spicy бургер', createdAt: '2023-05-04T09:46:19.213Z', …}
14
: 
{_id: '64537bb745c6f2001be70c2e', ingredients: Array(2), status: 'done', name: 'Space флюоресцентный бургер', createdAt: '2023-05-04T09:32:39.342Z', …}
15
: 
{_id: '64537b8a45c6f2001be70c2b', ingredients: Array(3), status: 'done', name: 'Люминесцентный краторный бургер', createdAt: '2023-05-04T09:31:54.409Z', …}
16
: 
{_id: '64537b5d45c6f2001be70c29', ingredients: Array(3), status: 'done', name: 'Люминесцентный краторный бургер', createdAt: '2023-05-04T09:31:09.124Z', …}
17
: 
{_id: '64537b3e45c6f2001be70c27', ingredients: Array(3), status: 'done', name: 'Люминесцентный краторный бургер', createdAt: '2023-05-04T09:30:38.198Z', …}
18
: 
{_id: '64537b0d45c6f2001be70c24
