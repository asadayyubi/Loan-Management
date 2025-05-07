import re


def validate_pan(pan):
    return bool(re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", pan))


def validate_aadhar(aadhar):
    return bool(re.match(r"^\d{12}$", aadhar))


def validate_gstin(gstin):
    return bool(
        re.match(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$", gstin)
    )


def validate_udyam(udyam):
    return bool(re.match(r"^UDYAM-[A-Z]{2}-\d{2}-\d{7}$", udyam))
