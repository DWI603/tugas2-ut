new Vue({
  el: "#app",
  data: {
    upbjjList: dataBahanAjar.upbjjList,
    kategoriList: dataBahanAjar.kategoriList,
    stok: dataBahanAjar.stok.map(item => ({ ...item })),
    filterUpbjj: "", filterKategori: "", sortBy: "judul",
    hanyaPerluReorder: false, hanyaKosong: false,
    showForm: false, editing: false, formError: "", toast: "",
    form: {}
  },
  computed: {
    kategoriTersedia() {
      return [...new Set(this.stok.filter(x => x.upbjj === this.filterUpbjj).map(x => x.kategori))].sort();
    },
    filteredStok() {
      let list = this.stok.filter(item => {
        const cocokDaerah = !this.filterUpbjj || item.upbjj === this.filterUpbjj;
        const cocokKategori = !this.filterUpbjj || !this.filterKategori || item.kategori === this.filterKategori;
        const cocokReorder = !this.hanyaPerluReorder || (item.qty < item.safety && item.qty > 0);
        const cocokKosong = !this.hanyaKosong || item.qty === 0;
        return cocokDaerah && cocokKategori && cocokReorder && cocokKosong;
      });
      return list.slice().sort((a,b) => {
        if (this.sortBy === "qty" || this.sortBy === "harga") return a[this.sortBy] - b[this.sortBy];
        return a.judul.localeCompare(b.judul, "id");
      });
    },
    amanCount() { return this.stok.filter(x => x.qty >= x.safety && x.qty > 0).length; },
    menipisCount() { return this.stok.filter(x => x.qty < x.safety && x.qty > 0).length; },
    kosongCount() { return this.stok.filter(x => x.qty === 0).length; }
  },
  watch: {
    filterUpbjj() { this.filterKategori = ""; },
    hanyaKosong(value) { if (value) this.hanyaPerluReorder = false; },
    hanyaPerluReorder(value) { if (value) this.hanyaKosong = false; }
  },
  methods: {
    statusText(item) { return item.qty === 0 ? "Kosong" : item.qty < item.safety ? "Menipis" : "Aman"; },
    statusClass(item) { return item.qty === 0 ? "danger" : item.qty < item.safety ? "warning" : "success"; },
    statusIcon(item) { return item.qty === 0 ? "×" : item.qty < item.safety ? "!" : "✓"; },
    resetFilter() { this.filterUpbjj=""; this.filterKategori=""; this.sortBy="judul"; this.hanyaPerluReorder=false; this.hanyaKosong=false; },
    blankForm() { return { kode:"", judul:"", kategori:"", upbjj:"", lokasiRak:"", harga:0, qty:0, safety:0, catatanHTML:"" }; },
    openAdd() { this.editing=false; this.form=this.blankForm(); this.formError=""; this.showForm=true; },
    editItem(item) { this.editing=true; this.form={...item}; this.formError=""; this.showForm=true; },
    closeForm() { this.showForm=false; this.formError=""; },
    saveItem() {
      const f=this.form;
      if (!f.kode || !f.judul || !f.kategori || !f.upbjj || !f.lokasiRak) { this.formError="Mohon lengkapi semua data wajib."; return; }
      if (![f.harga,f.qty,f.safety].every(n => Number.isFinite(Number(n)) && Number(n)>=0)) { this.formError="Harga, stok, dan safety stock harus berupa angka nol atau lebih."; return; }
      if (!this.editing && this.stok.some(x => x.kode.toLowerCase() === f.kode.toLowerCase())) { this.formError="Kode mata kuliah sudah digunakan."; return; }
      if (this.editing) {
        const i=this.stok.findIndex(x => x.kode===f.kode);
        if (i!==-1) this.$set(this.stok,i,{...f, harga:Number(f.harga),qty:Number(f.qty),safety:Number(f.safety)});
      } else this.stok.push({...f,harga:Number(f.harga),qty:Number(f.qty),safety:Number(f.safety)});
      this.showForm=false; this.toast=this.editing ? "Data stok berhasil diperbarui." : "Bahan ajar baru berhasil ditambahkan.";
      setTimeout(()=>this.toast="",2600);
    }
  }
});