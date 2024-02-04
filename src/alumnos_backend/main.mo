import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor PostCrud {
	public type ImageObject = [Nat8];

	type alumnoID = Nat32;
	
    type carreraID = Nat32;
    
    type areaID = Nat32;

    type Area = {
		nombre: Text;
	};

    type Carrera = {
		nombre: Text;
		area: Area;
	};

	type Alumno = {
		nombre: Text;
		primerAp: Text;
		segundoAp: Text;
		matricula: Text;
		fechaNacimiento: Text;
		curp: Text;
		carrera: Carrera;
		semestre: Nat8;
		sexo: Text;
		image: ImageObject;
	};

	stable var alumnoID: alumnoID = 0;
	stable var carreraID: carreraID = 0;
	stable var areaID: areaID = 0;

	let listaCarreras = HashMap.HashMap<Text, Carrera>(0, Text.equal, Text.hash);
	let listaAreas = HashMap.HashMap<Text, Area>(0, Text.equal, Text.hash);
	let listaAlumnos = HashMap.HashMap<Text, Alumno>(0, Text.equal, Text.hash);

	private func generaAreaID() : Nat32 {
		areaID += 1;
		return areaID;
	};

	public query ({caller}) func whoami() : async Principal {
		return caller;
	};

	public shared (msg) func crearArea(nombre: Text) : async () {
		let area = {nombre=nombre};

		listaAreas.put(Nat32.toText(generaAreaID()), area);
		Debug.print("Nueva área creada ID: " # Nat32.toText(areaID));
		return ();
	};

	public query func obtieneAreas () : async [(Text, Area)] {
		let areaIter : Iter.Iter<(Text, Area)> = listaAreas.entries();
		let areaArray : [(Text, Area)] = Iter.toArray(areaIter);

		return areaArray;
	};

	public query func obtieneArea (id: Text) : async ?Area {
		let area: ?Area = listaAreas.get(id);
		return area;
	};

	public shared (msg) func actualizaAreat (id: Text, nombre: Text) : async Bool {
		let area: ?Area = listaAreas.get(id);

		switch (area) {
			case (null) {
				return false;
			};
			case (?areaActual) {
				let nuevaArea: Area = {nombre=nombre};
				listaAreas.put(id, nuevaArea);
				Debug.print("Area actualizada: " # id);
				return true;
			};
		};

	};

	public func eliminarArea (id: Text) : async Bool {
		let area : ?Area = listaAreas.get(id);
		switch (area) {
			case (null) {
				return false;
			};
			case (_) {
				ignore listaAreas.remove(id);
				Debug.print("Área eliminadaD: " # id);
				return true;
			};
		};
	};
}