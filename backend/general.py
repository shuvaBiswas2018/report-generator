from database import get_db_connection

def get_user_by_id(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, first_name, last_name, email FROM public.users WHERE id=%s",
        (user_id,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return None

    return {
        "id": row[0],
        "name": f"{row[1]} {row[2]}",
        "email": row[3],
    }

