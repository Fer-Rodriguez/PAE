import { useEffect, useRef } from "react";
import "./style.css";

export const FileUploadButton = ({
  onChange,
  currentFile,
}: {
  onChange: React.Dispatch<File> | undefined;
  currentFile: File | undefined;
}) => {
  const drop = useRef<HTMLLabelElement>(null);

  const onUpload = (files: FileList | null) => {
    if (files) {
      if (files[0].type.substring(0, files[0].type.indexOf("/")) === "image") {
        onChange?.(files[0]);
      } else {
        alert("Tipo de archivo inválido. Solo se pueden subir imágenes");
      }
    } else {
      alert(
        "Hubo un error al procesar tu archivo. Por favor inténtalo de nuevo"
      );
    }
  };

  useEffect(() => {
    drop.current?.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    drop.current?.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer?.files;

      if (files && files.length) {
        onUpload(files);
      }
    });

    return () => {
      drop.current?.removeEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      drop.current?.removeEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    };
  }, []);

  return (
    <div>
      <label
        ref={drop}
        className="FileUpload"
        style={{
          textAlign: "center",
          backgroundColor: "#4CC9F0",
          fontSize: "1rem",
          fontWeight: "600",
          height: "2.5rem",
          paddingInlineStart: "1rem",
          paddingInlineEnd: "1rem",
          borderRadius: "40px",
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        Añadir foto
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg,.gif"
          onChange={(e) => {
            onUpload(e.target.files);
          }}
        />
      </label>
      <p style={{ display: "inline", marginLeft: "2rem" }}>
        {currentFile
          ? `Se cargó el archivo ${currentFile?.name} correctamente`
          : ""}
      </p>
    </div>
  );
};
