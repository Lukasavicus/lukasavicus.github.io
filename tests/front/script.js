
// === BARCODE READER =========================================================
    let ORDER = null;
    let DETECTION = true;

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')    // Or '#yourElement' (optional)
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        console.log(data.codeResult.code);
        // document.querySelector('#resultado').innerText = data.codeResult.code;
        if(DETECTION){
            register_read(data);
        }
    });

    function register_read(data){
        console.log("register_read - Order", ORDER);
        let table = document.getElementById('order-itens-table');
        const barcode = parseInt(data.codeResult.code);
        console.log("barcode readed", barcode);
        const item_idx = ORDER.itens.findIndex(item => item.id === barcode)+1;
        console.log("index found", item_idx, ORDER.itens[item_idx]);

        let isnum = /^\d+$/.test(barcode);
        if (isnum) {
            // barcode is a number (formed uniquely by digits), but is not in list:
            emit_read_sound('err');
            invoke_toast("ERRO", `Item código: ${barcode} não existe nesse pedido`);
        }

        if(item_idx == 0){
            console.log('[DBG] invalid read');
            return;
        }
        lock_read();

        const readed_itens_qnt = parseInt(table.rows.item(item_idx).cells[3].innerHTML);
        const order_itens_qnt = parseInt(table.rows.item(item_idx).cells[2].innerHTML);
        console.log('[DBG] readed qnt', readed_itens_qnt);
        
        if(order_itens_qnt == (readed_itens_qnt+1)){
            table.rows.item(item_idx).cells[4].innerHTML = '<i class="fa-solid fa-check"></i>';
        }

        if(order_itens_qnt < (readed_itens_qnt+1)){
            emit_read_sound('err');
            invoke_toast("ERRO", `Leitura do item ${barcode} ultrapassa o limite da quantidade descrita no pedido`);
        }
        else{
            // OK - REGISTER SUCCESSFULLY ITEM READ
            table.rows.item(item_idx).cells[3].innerHTML = readed_itens_qnt + 1;
            emit_read_sound();
            confirm_read(barcode);
            table.rows.item(item_idx).cells[5].children[0].removeAttribute("disabled");
        }
    }

    function emit_read_sound(type='ok'){
        const audios = {
            'ok' : "Barcode-scanner-beep-sound.mp3",
            'err' :"wronganswer.mp3" 
        }
        const audio = new Audio(audios[type]);
        audio.play();
    }

    /* This should prevent multiple read in a short interval */
    function lock_read(timeout=2000){
        console.log('{DBG] locking');
        DETECTION = false;
        setTimeout(() => {
            console.log('[DBG] UNlocking');
            DETECTION = true;
        }, timeout);
    }

    function confirm_read(barcode){
        // alert(`Confirma a leitura do item ${barcode}?`)
        invoke_toast("INFO", `Leitura de 1 item do tipo ${barcode}`);
    }
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// === ORDERS =================================================================
    orders = [
        {
            'id' : 1234,
            'itens' : [
                {'id' : 1, 'desc' : 'calça acetinada verde 38', 'qnt' : 1},
                {'id' : 23617, 'desc' : 'calça acetinada azul 40', 'qnt' : 2},
                {'id' : 3, 'desc' : 'calça acetinada branca 42', 'qnt' : 1},
            ],
        },
        {
            'id' : 1235,
            'itens' : [
                {'id' : 4, 'desc' : 'blusa rosa M', 'qnt' : 1},
                {'id' : 5, 'desc' : 'calça acetinada azul 40', 'qnt' : 2}
            ],
        },

    ]

    function search_order(){
        const order_id = parseInt(document.getElementById('order-id').value);
        let order = orders.find(order => order.id === order_id);
        console.log(orders, order, order_id);
        if(order === null){
            console.log("Order not found");
        }
        else{
            load_itens(order);
            ORDER = order;
        }
    }

    function empty_table(){
        let table = document.getElementById('order-itens-table');
        while (table.rows.length > 1){
            table.deleteRow(1);
        }
    }

    function load_itens(order){
        console.log("Order", order);
        let table = document.getElementById('order-itens-table');
        empty_table();
        order.itens.forEach((item, idx) => {
            let row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            cell1.innerHTML = item.id;
            cell2.innerHTML = item.desc;
            cell3.innerHTML = item.qnt;
            cell4.innerHTML = 0;
            cell5.innerHTML = '<i class="fa-sharp fa-solid fa-info"></i>'; // <i class="fa-regular fa-xmark"></i> // <i class="fa-solid fa-check"></i>
            cell6.innerHTML = `<button type="button" class="btn btn-danger" onclick="decrement_item_qnt(${idx+1})" disabled><i class="fa-sharp fa-solid fa-trash"></i></button>`;
        });
    }

    function decrement_item_qnt(idx){
        let table = document.getElementById('order-itens-table');
        const readed_itens_qnt = parseInt(table.rows.item(idx).cells[3].innerHTML)-1;
        // confirm
        table.rows.item(idx).cells[3].innerHTML = readed_itens_qnt;
        if(readed_itens_qnt == 0){
            table.rows.item(idx).cells[5].children[0].setAttribute("disabled", "");
        }
    }
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ### TOASTS =================================================================
    function invoke_toast(type, msg){
        document.getElementById('toast-title').innerText = type;
        document.getElementById('toast-body').innerText = msg;
        $('#myToast').toast('show');
        setTimeout(() => $('#myToast').toast('hide'), 7000);
    }
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++