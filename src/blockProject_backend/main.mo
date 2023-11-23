import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  public type Note = {
    title : Text;
    content : Text;
  };

  var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText : Text, contentText : Text) {

    let newNotes : Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNotes, notes);
    Debug.print(debug_show (notes));
  };

  public query func readNotes() : async [Note] {  // async [Note] =>  return async array of Note
    return List.toArray(notes)                    //  converting list into array
  };

};