let sisaUang = 0;
let kebutuhan = [];

// format input 500000 -> 500.000
function formatInput(input) {
  let angka = input.value.replace(/\D/g, "");
  if (angka === "") {
    input.value = "";
    return;
  }
  input.value = Number(angka).toLocaleString("id-ID");
}

// hapus titik
function ambilAngka(teks) {
  return Number(teks.replace(/\./g, ""));
}

// SET TOTAL + RESET INPUT
function setTotal() {
  let input = document.getElementById("totalUang");
  sisaUang = ambilAngka(input.value);

  input.value = ""; // ✅ INI YANG KAMU MAU
  tampilSisa();
}

// TAMBAH KEBUTUHAN
function tambahKebutuhan() {
  let nama = document.getElementById("namaKebutuhan").value;
  let nominal = ambilAngka(document.getElementById("nominalKebutuhan").value);

  if (nama === "" || nominal <= 0) return;
  if (nominal > sisaUang) return;

  sisaUang = sisaUang - nominal;

  kebutuhan.push({ nama: nama, sisa: nominal });

  document.getElementById("namaKebutuhan").value = "";
  document.getElementById("nominalKebutuhan").value = "";

  tampilKebutuhan();
  tampilSisa();
}

// PAKAI UANG
function pakaiUang(i) {
  let input = document.getElementById("pakai-" + i);
  let jumlah = ambilAngka(input.value);

  if (jumlah <= 0) return;
  if (jumlah > kebutuhan[i].sisa) return;

  kebutuhan[i].sisa = kebutuhan[i].sisa - jumlah;
  input.value = "";

  tampilKebutuhan();
}

// TAMPIL KEBUTUHAN
function tampilKebutuhan() {
  let list = document.getElementById("listKebutuhan");
  let template = document.getElementById("templateKebutuhan");

  list.innerHTML = "";

  for (let i = 0; i < kebutuhan.length; i++) {
    let item = template.cloneNode(true);
    item.style.display = "block";

    item.querySelector(".nama").innerText = kebutuhan[i].nama;
    item.querySelector(".sisa").innerText =
      "Sisa: Rp " + kebutuhan[i].sisa.toLocaleString("id-ID");

    let input = item.querySelector(".pakai");
    let tombol = item.querySelector(".btnPakai");

    tombol.onclick = function () {
      pakaiUang(i);
    };

    input.id = "pakai-" + i;

    list.appendChild(item);
  }
}

// TAMPIL SISA TOTAL
function tampilSisa() {
  document.getElementById("sisaTotal").innerText =
    "Sisa total: Rp " + sisaUang.toLocaleString("id-ID");
}
