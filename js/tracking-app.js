new Vue({
  el: "#trackingApp",
  data: {
    pengirimanList: dataBahanAjar.pengirimanList,
    paketList: dataBahanAjar.paket,
    tracking: JSON.parse(JSON.stringify(dataBahanAjar.tracking)),
    selectedDo: Object.keys(dataBahanAjar.tracking)[0] || "",
    showForm: false, formError: "", toast: "",
    form: { nim:"", nama:"", ekspedisi:"", paket:"", tanggalKirim:new Date().toLocaleDateString("en-CA") }
  },
  computed: {
    trackingList() { return this.tracking; },
    selected() { return this.tracking[this.selectedDo] || null; },
    selectedPackage() { return this.paketList.find(p => p.kode===this.form.paket) || null; },
    nextDo() {
  const nomorDO = Object.keys(this.tracking);

  let nomorTerakhir = 0;
  let tahunDO = "2025";

  nomorDO.forEach(no => {
    const cocok = no.match(/^DO(\d{4})-(\d+)$/);

    if (cocok) {
      tahunDO = cocok[1];
      nomorTerakhir = Math.max(nomorTerakhir, parseInt(cocok[2], 10));
    }
  });

  return "DO" + tahunDO + "-" + String(nomorTerakhir + 1).padStart(3, "0");
}
  },
  methods: {
    formatRupiah(value) { return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(value || 0); },
    formatDate(value) { if(!value) return "—"; return new Date(value+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"}); },
    deliveryStatusClass(status) { return status==="Selesai" ? "success" : status==="Dalam Perjalanan" ? "info" : "warning"; },
    addDO() {
      const f=this.form, pkg=this.selectedPackage;
      if(!f.nim || !f.nama || !f.ekspedisi || !pkg || !f.tanggalKirim) { this.formError="Mohon lengkapi seluruh data Delivery Order."; return; }
      const no=this.nextDo;
      this.$set(this.tracking,no,{nim:f.nim,nama:f.nama,status:"Diproses",ekspedisi:f.ekspedisi,tanggalKirim:f.tanggalKirim,paket:pkg.kode,total:pkg.harga,perjalanan:[{waktu:new Date().toLocaleString("sv-SE"),keterangan:"Delivery Order dibuat dan sedang diproses"}]});
      this.selectedDo=no; this.form={nim:"",nama:"",ekspedisi:"",paket:"",tanggalKirim:new Date().toLocaleDateString("en-CA")};
      this.formError=""; this.showForm=false; this.toast="Delivery Order "+no+" berhasil dibuat.";
      setTimeout(()=>this.toast="",3000);
    }
  }
});