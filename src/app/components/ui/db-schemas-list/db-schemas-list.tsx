"use client";

import styles from "./db-schemas-list.module.css";
import { AppButton } from "../buttons/app-button";
import { NewSchemaFormModal } from "./components/new-schema-form-modal/new-schema-form-modal";
import { DbSchemasListItem } from "./components/db-schemas-list-item/db-schemas-list-item";
import { useDbSchemasList } from "./db-schemas-list.hooks";
import { AppButtonVariants } from "../buttons/app-button.types";

export function DbSchemasList() {
  const {
    isFormModalOpen,
    openFormModal,
    clearNewSchemaForm,
    closeFormModal,
    deleteSchema,
    goToChat,
    handleNewSchemaFileInputChange,
    newSchemaValue,
    saveNewSchema,
    schemaScripts,
    setNewSchemaValue,
  } = useDbSchemasList();

  return (
    <section>
      <div className={styles.header}>
        <h3>Schemas salvos</h3>
        <AppButton variant={AppButtonVariants.SUCCESS} onClick={openFormModal}>
          Novo +
        </AppButton>
      </div>

      <ul className={styles.list}>
        {schemaScripts.map((schema, index) => (
          <DbSchemasListItem
            key={`schema-${index}`}
            schema={schema}
            onClickChat={goToChat}
            onClickDelete={deleteSchema}
          />
        ))}
      </ul>

      <NewSchemaFormModal
        isModalOpen={isFormModalOpen}
        closeModal={closeFormModal}
        value={newSchemaValue}
        setValue={setNewSchemaValue}
        handleFileInputChange={handleNewSchemaFileInputChange}
        onSave={saveNewSchema}
        clearForm={clearNewSchemaForm}
      />
    </section>
  );
}
